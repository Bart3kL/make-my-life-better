import { useReducer, useRef, useEffect, useCallback, type FormEvent } from "react";
import EditorJS, { type ToolConstructable } from "@editorjs/editorjs";
import { useRouter } from "next/navigation";

import { blogReducer, initialState } from "./actions";
import { type BlockProps, type UseFormHandlerProps } from "./types";
import { parseStructure } from "@/lib/parsteBlogPostStructure";

export const useFormHandler = ({
	post,
	token,
	isContentPage,
	style,
	headerLength,
}: UseFormHandlerProps) => {
	const [state, dispatch] = useReducer(blogReducer, {
		...initialState,
		title: post?.title || "",
		url: post?.url || "",
		loading: false,
	});
	const ref = useRef<EditorJS | undefined>(undefined);
	const router = useRouter();

	const fetchStreamedData = async (headerObj: { id: string; data: { text: string } }) => {
		const response = await fetch("/api/blog/createContent", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			cache: "no-cache",
			body: JSON.stringify({
				title: post.title,
				header: headerObj.data.text,
				headers: (JSON.parse(post.structure) as { blocks: BlockProps[] }).blocks,
				style,
				headerLength,
			}),
		});

		const reader = response.body!.getReader();
		const decoder = new TextDecoder("utf-8");
		let partialContent = "";

		while (true) {
			const { done, value } = await reader.read();
			if (done) break;
			partialContent += decoder.decode(value, { stream: true });
		}

		const newContent = {
			id: `para-${headerObj.id}`,
			type: "paragraph",
			data: { text: partialContent },
		};

		const updatedBlocks = (JSON.parse(post.structure) as { blocks: BlockProps[] }).blocks;
		const headerIndex = updatedBlocks.findIndex((b) => b.id === headerObj.id);
		if (headerIndex !== -1) {
			updatedBlocks.splice(headerIndex + 1, 0, newContent);
		}
		post.structure = JSON.stringify({ ...JSON.parse(post.structure), blocks: updatedBlocks });

		void ref.current?.render({ blocks: updatedBlocks });
	};

	const processHeadersSequentially = async (headers: { id: string; data: { text: string } }[]) => {
		for (const header of headers) {
			await fetchStreamedData(header);
		}
	};

	const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		dispatch({ type: "SET_LOADING", loading: true });

		try {
			const savedBlocks = await ref.current?.save();

			if (!isContentPage) {
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
			} else {
				const headers = (JSON.parse(post.structure) as { blocks: BlockProps[] }).blocks.filter(
					(block: { type: string }) => block.type === "header",
				);
				await processHeadersSequentially(headers);
				const updatedBlocks = await ref.current?.save();
				const response = await fetch("/api/blog/updatePost", {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					cache: "no-cache",
					body: JSON.stringify({
						structure: JSON.stringify(updatedBlocks),
						status: "prepared",
						postId: post.id,
					}),
				});

				if (response.ok) {
					router.push(`/blog/post/${post.id}`);
				}
			}
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
					blocks: isContentPage
						? (JSON.parse(post.structure) as { blocks: BlockProps[] }).blocks
						: parseStructure(post.structure),
				},
				defaultBlock: "header",
				tools: isContentPage
					? {
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
						}
					: {
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
	}, [isContentPage, post.structure]);

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

					if (isContentPage) {
						initializeSpinners();
					}
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
	}, [state.isMounted, initEditor, isContentPage, initializeSpinners]);

	return {
		state,
		dispatch,
		onSubmitHandler,
	};
};
