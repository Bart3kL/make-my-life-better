export interface BlogState {
	step: number;
	titleBlogPost: string;
	files: File[];
	knowledgeText: string;
	knowledgeUrls: string;
	errors: Partial<{
		form: string;
		titleBlogPost: string;
		knowledgeError: string; // Jeden stan błędu dla wszystkich trzech pól
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
	| { type: "SET_STEP"; payload: number };
