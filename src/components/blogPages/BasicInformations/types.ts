export interface BlogState {
	step: number;
	titleBlogPost: string;
	files: File[];
	image: File | null;
	knowledgeText: string;
	knowledgeUrls: string;
	errors: Partial<{
		form: string;
		titleBlogPost: string;
		knowledgeError: string;
		imageError: string;
	}>;

	isSubmitting: boolean;
}

export type BlogAction =
	| { type: "SET_FIELD"; field: string; value: string }
	| { type: "SET_ERRORS"; errors: Partial<BlogState["errors"]> }
	| { type: "SET_IS_SUBMITTING"; isSubmitting: boolean }
	| { type: "RESET_FORM" }
	| { type: "UPLOAD_FILES"; payload: File[] }
	| { type: "DELETE_FILE"; payload: File }
	| { type: "UPLOAD_IMAGE"; payload: File }
	| { type: "DELETE_IMAGE" }
	| { type: "SET_STEP"; payload: number };

export interface BasicInformationsProps {
	token: string;
}
export interface UseBlogReducerProps {
	token: string;
}
