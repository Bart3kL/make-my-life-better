export type PostProps = {
	id: string;
	title: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	content: any;
	useremail: string;
	structure: string;
	createdAt: string;
	status: "published" | "draft" | "onlyStructure";
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

export interface UseFormHandlerProps {
	post: PostProps;
	token: string;
	isContentPage?: boolean;
	style?: string;
	headerLength?: string;
}

export interface EditorProps {
	post: PostProps;
	token: string;
	isContentPage?: boolean;
	style?: string;
	headerLength?: string;
}

export type BlogState = {
	title: string;
	url: string;
	postType: string;
	imageFile: File | null | File[];
	isMounted: boolean;

	loading: boolean;
};

export interface BlockProps {
	id: string;
	type: string;
	data: {
		text: string;
	};
}
export type BlogAction =
	| { type: "SET_FIELD"; field: keyof BlogState; value: string | boolean }
	| { type: "UPLOAD_FILES"; payload: File[] | File }
	| { type: "DELETE_FILE"; payload: File }
	| { type: "SET_ERRORS"; errors: Record<string, string> }
	| { type: "SET_STEP"; payload: number }
	| { type: "RESET_FORM" }
	| { type: "SET_LOADING"; loading: boolean };
