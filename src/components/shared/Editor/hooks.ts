import { useReducer, useRef, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import type EditorJS from "@editorjs/editorjs";

import { blogReducer, initialState } from "./actions";
import { parseStructure } from "@/lib/parsteBlogPostStructure";

export const useFormHandler = ({ post }: { post: any }) => {
	const router = useRouter();
	const params = useParams();

	const [state, dispatch] = useReducer(blogReducer, {
		...initialState,
		title: post?.title || "",
		url: post?.url || "",
	});

	const ref = useRef<EditorJS | undefined>(undefined);

	const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch({ type: "SET_IS_SUBMITTING", isSubmitting: true });

		try {
			const blocks = await ref.current?.save();
			console.log(blocks, parseStructure(post?.structure!));
			if (params.postId) {
				// await axios.patch(`/api/posts/${post?.url}`, {
				//   title: state.title,
				//   content: blocks,
				//   image: state.imageFile !== null ? state.imageFile : post?.image,
				//   type: state.postType,
				//   postId: post?.id,
				//   userId: post?.author.id,
				//   category: category,
				//   url: state.url,
				// });
				// router.push(`/blog/post/${post?.url}`);
			} else {
				// await axios.post("/api/posts", {
				//   title: state.title,
				//   content: blocks,
				//   image: state.imageFile,
				//   type: state.postType,
				//   category: category,
				//   url: state.url,
				// });
			}

			// Clear the form and editor content
			// dispatch({ type: "RESET_FORM" });
			// ref.current?.clear();
		} catch (error: any) {
			console.error(error);
		} finally {
			// dispatch({ type: "SET_IS_SUBMITTING", isSubmitting: false });
		}
	};

	const initEditor = useCallback(async () => {
		const EditorJS = (await import("@editorjs/editorjs")).default;
		const Header = (await import("@editorjs/header")).default;

		if (!ref.current) {
			const editor = new EditorJS({
				holder: "editor",
				placeholder: "Write your post content here...",
				inlineToolbar: true,
				data: {
					blocks: parseStructure(post?.structure),
				},
				defaultBlock: "header",

				tools: {
					header: {
						class: Header,
						inlineToolbar: true,
						config: {
							placeholder: "Enter a header",
							levels: [2, 3, 4, 5, 6],
							defaultLevel: 2,
						},
					},
				},
				onReady: () => {
					ref.current = editor;
				},
			});
		}
	}, [post]);

	useEffect(() => {
		if (typeof window !== "undefined") {
			dispatch({ type: "SET_FIELD", field: "isMounted", value: true });
		}
	}, []);

	useEffect(() => {
		if (state.isMounted) {
			initEditor();

			return () => {
				ref.current && ref.current.destroy();
				ref.current = undefined;
			};
		}
	}, [state.isMounted, initEditor]);

	return {
		state,
		dispatch,
		onSubmitHandler,
	};
};
