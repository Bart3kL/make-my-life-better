import { useReducer, useState } from "react";
import { useRouter } from "next/navigation";

import { BlogState, BlogAction } from "./types";
import { initialState, blogReducer } from "./actions";

export function useBlogReducer() {
	const [state, dispatch] = useReducer<React.Reducer<BlogState, BlogAction>>(
		blogReducer,
		initialState,
	);

	const router = useRouter();

	const [loading, setLoading] = useState<boolean>(false);

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
		} else {
			setLoading(true);
			let processedData: any = {};

			try {
				if (state.knowledgeUrls) {
					const urls = state.knowledgeUrls.split(",").map((url) => url.trim());
					const urlContents = await fetch("/api/blog/getContentFromUrls", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						cache: "no-cache",
						body: JSON.stringify({ urls }),
					}).then((res) => res.json());
					processedData["urlsContent"] = urlContents.contents;
				}

				if (state.files.length > 0) {
					const fileContents = await Promise.all(state.files.map(readFileContent));

					processedData["files"] = fileContents;
				}

				if (state.knowledgeText) {
					processedData["text"] = state.knowledgeText;
				}

				const responseStructure = await fetch("/api/blog/generateBlogPostStructure", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					cache: "no-cache",
					body: JSON.stringify({ titleBlogPost: state.titleBlogPost, processedData }),
				});

				const resultStructure = await responseStructure.json();

				const responseNewPost = await fetch("/api/blog/addBlogPostStructure", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					cache: "no-cache",
					body: JSON.stringify({
						userEmail: "blewandowski.2221@gmail.com",
						title: state.titleBlogPost,
						status: "onlyStructure",
						structure: resultStructure.blogStructure,
					}),
				});
				const resultNewPost = await responseNewPost.json();

				console.log(resultStructure.blogStructure, resultNewPost);

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
					reject(error);
				}
			};
			reader.onerror = (error) => reject(error);
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
	};
}
