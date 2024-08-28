import { useReducer, useState } from "react";
import { useRouter } from "next/navigation";

import { type BlogState, type BlogAction, type UseBlogReducerProps } from "./types";
import { initialState, blogReducer } from "./actions";
import { type RootState, useAppSelector } from "@/redux/store";
import { convertImageToBase64 } from "@/lib/convertImageTobase64";
import { type UserProps } from "@/components/shared/GetCurrentUser/types";

export function useBlogReducer({ token }: UseBlogReducerProps) {
	const [state, dispatch] = useReducer<React.Reducer<BlogState, BlogAction>>(
		blogReducer,
		initialState,
	);
	const router = useRouter();
	const [loading, setLoading] = useState<boolean>(false);

	const user = useAppSelector((state: RootState) => state.auth.user) as { user: UserProps } | null;

	const me = user?.user;

	const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		dispatch({ type: "SET_FIELD", field: event.target.id, value: event.target.value });
		if (["knowledgeText", "knowledgeUrls", "files"].includes(event.target.id)) {
			dispatch({ type: "SET_ERRORS", errors: { knowledgeError: "" } });
		}
	};

	const handleFileUpload = (newFiles: File[]) => {
		dispatch({ type: "UPLOAD_FILES", payload: newFiles });
		dispatch({ type: "SET_ERRORS", errors: { knowledgeError: "" } });
	};

	const handleFileDelete = (fileToDelete: File) => {
		dispatch({ type: "DELETE_FILE", payload: fileToDelete });
		dispatch({ type: "SET_ERRORS", errors: { knowledgeError: "" } });
	};

	const handleImageUpload = (image: File) => {
		dispatch({ type: "UPLOAD_IMAGE", payload: image });
		dispatch({ type: "SET_ERRORS", errors: { imageError: "" } });
	};

	const handleImageDelete = () => {
		dispatch({ type: "DELETE_IMAGE" });
		dispatch({ type: "SET_ERRORS", errors: { imageError: "" } });
	};

	const validate = (): Partial<BlogState["errors"]> => {
		const errors: Partial<BlogState["errors"]> = {};
		if (!state.titleBlogPost) {
			errors.titleBlogPost = "Blog post title is required";
		}

		const urlRegex = /^https:\/\/[^,\s]+$/;
		if (
			state.step === 2 &&
			state.files.length === 0 &&
			!state.knowledgeText &&
			!state.knowledgeUrls
		) {
			errors.knowledgeError = "At least one file, knowledge text, or knowledge URL is required";
		} else if (
			state.knowledgeUrls &&
			!state.knowledgeUrls.split(",").every((url) => urlRegex.test(url))
		) {
			errors.knowledgeError =
				"Each URL must start with 'https://' and be separated by commas without spaces.";
		}

		if (state.step === 3 && !state.image) {
			errors.imageError = "An image is required for the blog post";
		}

		return errors;
	};

	const handleSubmit = async (): Promise<boolean> => {
		const errors = validate();

		if (Object.keys(errors).length > 0) {
			dispatch({ type: "SET_ERRORS", errors });
			return false;
		}

		if (state.step === 1) {
			dispatch({ type: "SET_STEP", payload: 2 });
		} else if (state.step === 2) {
			dispatch({ type: "SET_STEP", payload: 3 });
		} else if (state.step === 3) {
			setLoading(true);
			const processedData: { files?: string[]; text?: string; urlsContent?: string[] } = {};

			try {
				if (state.knowledgeUrls) {
					const urls = state.knowledgeUrls.split(",").map((url) => url.trim());
					const urlContents = (await fetch("/api/blog/getContentFromUrls", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
						cache: "no-cache",
						body: JSON.stringify({ urls }),
					}).then((res) => res.json())) as { contents: string[] };

					processedData["urlsContent"] = urlContents.contents;
				}

				if (state.files.length > 0) {
					const fileContents = await Promise.all(state.files.map(readFileContent));

					processedData["files"] = fileContents;
				}

				if (state.knowledgeText) {
					processedData["text"] = state.knowledgeText;
				}
				const responseStructure = await fetch("/api/blog/generateStructure", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					cache: "no-cache",
					body: JSON.stringify({ titleBlogPost: state.titleBlogPost, processedData }),
				});

				const resultStructure = (await responseStructure.json()) as { blogStructure: string };

				const convertedImage = await convertImageToBase64(state.image!);

				const responseNewPost = await fetch("/api/blog/addStructure", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					cache: "no-cache",
					body: JSON.stringify({
						userEmail: me!.email,
						title: state.titleBlogPost,
						status: "onlyStructure",
						structure: resultStructure.blogStructure,
						image: convertedImage,
					}),
				});
				const resultNewPost = (await responseNewPost.json()) as { blogPost: { id: string } };

				router.push(`/dashboard/blog/structure?blogPostId=${resultNewPost.blogPost.id}`);
			} catch (error) {
				console.error("Error during data processing:", error);
				setLoading(false);
				return false;
			}
		}

		setTimeout(() => {
			setLoading(false);
		}, 2000);
		return true;
	};

	const readFileContent = (file: File): Promise<string> => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => {
				try {
					const text = reader.result as string;
					resolve(text);
				} catch (error) {
					if (error instanceof Error) {
						reject(new Error(`Failed to read file content: ${error.message}`));
					} else {
						reject(new Error("An unknown error occurred while reading the file content."));
					}
				}
			};

			reader.onerror = (error) => {
				if (error instanceof Error) {
					reject(new Error(`File read error: ${error.message}`));
				} else {
					reject(new Error("An unknown file read error occurred."));
				}
			};
			reader.readAsText(file);
		});
	};

	return {
		state,
		loading,
		handleChange,
		handleSubmit,
		handleFileUpload,
		handleFileDelete,
		handleImageUpload,
		handleImageDelete,
	};
}
