import { type BlockProps } from "@/components/shared/Editor/types";

export type ParsedHeader = {
	id: string;
	type: "header";
	data: {
		text: string | null;
		level: number;
	};
};

export type DecodedToken = {
	email: string;
};

export interface UseFetchProps {
	endpoint: string;
	method: string;
	requestBody: string;
}

export interface GetContentFromUrlReequest {
	urls: string[];
}
export interface UpdatePostRequest {
	structure: string;
	status: string;
	postId: string;
	title?: string;
}

export interface GetAllBlogPostsRequest {
	status: string;
	fields: string;
}
export interface CreateContentRequest {
	title: string;
	header: string;
	headers: BlockProps[];
	style: string;
	headerLength: number;
}

export interface AddPostRequest {
	userEmail: string;
	structure: string;
	status: string;
	title: string;
	image: string;
}
export interface SignUpRequest {
	firstname: string;
	lastname: string;
	email: string;
	password: string;
}

export interface SignInRequest {
	email: string;
	password: string;
}

export interface ResetRequest {
	token: string;
	newPassword: string;
}
export interface RequestResetRequest {
	email: string;
}
