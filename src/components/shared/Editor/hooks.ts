import { useReducer, useRef, useEffect, useCallback, type FormEvent } from "react";
import EditorJS, { type ToolConstructable } from "@editorjs/editorjs";
import { useRouter } from "next/navigation";

import { blogReducer, initialState } from "./actions";
import { type BlockProps, type UseFormHandlerProps } from "./types";
import { parseStructure } from "@/lib/parsteBlogPostStructure";

export const useFormHandler = ({ post, token }: UseFormHandlerProps) => {
	const [state, dispatch] = useReducer(blogReducer, {
		...initialState,
		title: post?.title || "",
		url: post?.url || "",
		loading: false,
	});
	const ref = useRef<EditorJS | undefined>(undefined);
	const router = useRouter();

	const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		dispatch({ type: "SET_LOADING", loading: true });

		try {
			const savedBlocks = await ref.current?.save();

			await fetch("/api/blog/updatePost", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				cache: "no-cache",
				body: JSON.stringify({
					structure: JSON.stringify(savedBlocks),
					status: "draft",
					postId: post.id,
				}),
			});

			router.push(`/blog/content?blogPostId=${post.id}`);
		} catch (error) {
			console.error(error);
		} finally {
			dispatch({ type: "SET_LOADING", loading: false });
		}
	};

	const initEditor = useCallback(async () => {
		const { default: Header } = (await import("@editorjs/header")) as unknown as {
			default: ToolConstructable;
		};

		if (!ref.current) {
			const editor = new EditorJS({
				holder: "editor",
				placeholder: "Write your post content here...",
				inlineToolbar: true,
				data: {
					blocks: parseStructure(post.structure),
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
	}, [post.structure]);

	useEffect(() => {
		if (typeof window !== "undefined") {
			dispatch({ type: "SET_FIELD", field: "isMounted", value: true });
		}
	}, []);

	const initializeSpinners = useCallback(() => {
		return (JSON.parse(post.structure) as { blocks: BlockProps[] }).blocks.filter(
			(block: { type: string }) => block.type === "header",
		);
	}, [post.structure]);

	useEffect(() => {
		const initialize = async () => {
			if (state.isMounted) {
				try {
					await initEditor();
				} catch (error) {
					console.error("Failed to initialize editor:", error);
				}
			}
		};

		void initialize();

		return () => {
			if (ref.current) {
				ref.current.destroy();

				ref.current = undefined;
			}
		};
	}, [state.isMounted, initEditor, initializeSpinners]);

	return {
		state,
		dispatch,
		onSubmitHandler,
	};
};
