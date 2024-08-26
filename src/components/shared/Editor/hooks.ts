import { useReducer, useRef, useEffect, useCallback } from "react";
import type EditorJS from "@editorjs/editorjs";

import { blogReducer, initialState } from "./actions";
import { parseStructure } from "@/lib/parsteBlogPostStructure";
import { UseFormHandlerProps } from "./types";

export const useFormHandler = ({ post, token }: UseFormHandlerProps) => {
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

			await fetch("/api/blog/updateBlogPostStructure", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				cache: "no-cache",
				body: JSON.stringify({
					structure: JSON.stringify(blocks),
				}),
			});

			dispatch({ type: "RESET_FORM" });
			ref.current?.clear();
		} catch (error: any) {
			console.error(error);
		} finally {
			dispatch({ type: "SET_IS_SUBMITTING", isSubmitting: false });
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
					blocks: parseStructure(post?.structure!),
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
