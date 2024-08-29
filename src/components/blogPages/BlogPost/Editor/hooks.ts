import { useReducer, useRef, useEffect, useCallback, type FormEvent } from "react";
import EditorJS, { type ToolConstructable } from "@editorjs/editorjs";
import { useRouter } from "next/navigation";

import { blogReducer, initialState } from "./actions";
import { type BlockProps, type UseFormHandlerProps } from "./types";

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

		try {
			const savedBlocks = await ref.current?.save();

			const response = await fetch("/api/blog/updatePost", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				cache: "no-cache",
				body: JSON.stringify({
					structure: JSON.stringify(savedBlocks),
					status: "prepared",
					postId: post.id,
					title: state.title,
				}),
			});
			if (response.ok) {
				router.push(`/blog/post/${post.id}/preview`);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const initEditor = useCallback(async () => {
		const { default: Header } = (await import("@editorjs/header")) as unknown as {
			default: ToolConstructable;
		};
		const { default: Table } = (await import("@editorjs/table")) as unknown as {
			default: ToolConstructable;
		};
		const { default: Embed } = (await import("@editorjs/embed")) as unknown as {
			default: ToolConstructable;
		};
		const { default: List } = (await import("@editorjs/list")) as unknown as {
			default: ToolConstructable;
		};
		const { default: Code } = (await import("@editorjs/code")) as unknown as {
			default: ToolConstructable;
		};
		const { default: LinkTool } = (await import("@editorjs/link")) as unknown as {
			default: ToolConstructable;
		};
		const { default: InlineCode } = (await import("@editorjs/inline-code")) as unknown as {
			default: ToolConstructable;
		};
		const { default: Quote } = (await import("@editorjs/quote")) as unknown as {
			default: ToolConstructable;
		};
		const { default: Raw } = (await import("@editorjs/raw")) as unknown as {
			default: ToolConstructable;
		};
		const { default: CheckList } = (await import("@editorjs/checklist")) as unknown as {
			default: ToolConstructable;
		};

		if (!ref.current) {
			const editor = new EditorJS({
				holder: "editor",
				placeholder: "Write your post content here...",
				inlineToolbar: true,
				data: {
					blocks: (JSON.parse(post.structure) as { blocks: BlockProps[] }).blocks,
				},

				tools: {
					list: List,
					checkList: CheckList,
					embed: Embed,
					linkTool: LinkTool,
					inlineCode: InlineCode,
					table: Table,
					quote: Quote,
					code: Code,
					raw: Raw,
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
	}, [state.isMounted, initEditor]);

	return {
		state,
		dispatch,
		onSubmitHandler,
	};
};
