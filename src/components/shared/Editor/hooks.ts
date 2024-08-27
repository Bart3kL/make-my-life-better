import { useReducer, useRef, useEffect, useCallback } from "react";
import type EditorJS from "@editorjs/editorjs";
import { headers } from "next/headers";
import { blogReducer, initialState } from "./actions";
import { parseStructure } from "@/lib/parsteBlogPostStructure";

export const useFormHandler = ({ post, token, isContentPage, style, headerLength }: any) => {
	const [state, dispatch] = useReducer(blogReducer, {
		...initialState,
		title: post?.title || "",
		url: post?.url || "",
		loading: false,
	});
	const ref = useRef<EditorJS | undefined>(undefined);

	const fetchStreamedData = async (headerObj: any) => {
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
				headers: JSON.parse(post.structure).blocks,
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

		const updatedBlocks = JSON.parse(post.structure).blocks;
		const headerIndex = updatedBlocks.findIndex((b: any) => b.id === headerObj.id);
		if (headerIndex !== -1) {
			updatedBlocks.splice(headerIndex + 1, 0, newContent);
		}
		post.structure = JSON.stringify({ ...JSON.parse(post.structure), blocks: updatedBlocks });

		ref.current?.render({ blocks: updatedBlocks });
	};

	const processHeadersSequentially = async (headers: any) => {
		for (let i = 0; i < headers.length; i++) {
			await fetchStreamedData(headers[i]);
		}
	};

	const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		dispatch({ type: "SET_LOADING", loading: true });

		try {
			const savedBlocks = await ref.current?.save();

			if (!isContentPage) {
				console.log(post);
				await fetch("/api/blog/updateBlogPostStructure", {
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
			} else {
				const headers = JSON.parse(post.structure).blocks.filter(
					(block: any) => block.type === "header",
				);
				await processHeadersSequentially(headers);
				const updatedBlocks = await ref.current?.save();
				const response = await fetch("/api/blog/updateBlogPostStructure", {
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

				console.log(1, await response.json());
			}
		} catch (error: any) {
			console.error(error);
		} finally {
			dispatch({ type: "SET_LOADING", loading: false });
		}
	};

	const initEditor = useCallback(async () => {
		const EditorJS = (await import("@editorjs/editorjs")).default;
		const Header = (await import("@editorjs/header")).default;
		const Table = (await import("@editorjs/table")).default;
		const Embed = (await import("@editorjs/embed")).default;
		const List = (await import("@editorjs/list")).default;
		const Code = (await import("@editorjs/code")).default;
		const LinkTool = (await import("@editorjs/link")).default;
		const InlineCode = (await import("@editorjs/inline-code")).default;
		const Quote = (await import("@editorjs/quote")).default;
		const Raw = (await import("@editorjs/raw")).default;
		const CheckList = (await import("@editorjs/checklist")).default;

		if (!ref.current) {
			const editor = new EditorJS({
				holder: "editor",
				placeholder: "Write your post content here...",
				inlineToolbar: true,
				data: {
					blocks: isContentPage
						? JSON.parse(post.structure).blocks
						: parseStructure(post?.structure),
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
	}, [post]);

	useEffect(() => {
		if (typeof window !== "undefined") {
			dispatch({ type: "SET_FIELD", field: "isMounted", value: true });
		}
	}, []);

	const initializeSpinners = () => {
		return JSON.parse(post.structure).blocks.filter((block: any) => block.type === "header");
	};

	useEffect(() => {
		if (state.isMounted) {
			initEditor().then(() => {
				isContentPage && initializeSpinners();
			});

			return () => {
				if (ref.current) {
					ref.current.destroy();
					ref.current = undefined;
				}
			};
		}
	}, [state.isMounted, initEditor]);

	return {
		state,
		dispatch,
		onSubmitHandler,
	};
};
