export type PostProps = {
	id: string;
	title: string;
	content: any;
	useremail: string;
	structure?: string;
	createdAt: string;
	type: "published" | "draft" | "onlyStructure";
	image: string;
	url: string;
};

export type TForm = {
	title: string;
	image: Blob | MediaSource;
	postType: "DRAFT" | "PUBLISHED";
	category: string;
	url: string;
};

export interface EditorProps {
	post: PostProps | null;
}

export type BlogState = {
	title: string;
	url: string;
	postType: string;
	imageFile: any;
	isMounted: boolean;
	isSubmitting: boolean;
};

export type BlogAction =
	| { type: "SET_FIELD"; field: keyof BlogState; value: any }
	| { type: "UPLOAD_FILES"; payload: any[] }
	| { type: "DELETE_FILE"; payload: any }
	| { type: "SET_ERRORS"; errors: Record<string, string> }
	| { type: "SET_STEP"; payload: number }
	| { type: "SET_IS_SUBMITTING"; isSubmitting: boolean }
	| { type: "RESET_FORM" };
