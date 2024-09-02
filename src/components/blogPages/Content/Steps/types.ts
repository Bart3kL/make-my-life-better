import { type PostProps } from "@/components/shared/Editor/types";

export interface StepsState {
	headerLength: string;
	style: string;
	currentStep: number;
	loading: boolean;
}

export interface FormProps {
	isSignInPage?: boolean;
	isResetPasswordPage?: boolean;
	isEnterNewPasswordPage?: boolean;
}

export type FormAction =
	| {
			type: "SET_FIELD";
			field: string;
			value: string;
	  }
	| {
			type: "SET_STEP";
			payload: number;
	  }
	| { type: "SET_LOADING"; loading: boolean };

export interface StepsProps {
	token: string;
	blogPost: PostProps;
}
export interface UseStepsReducerProps {
	token: string;
	post: PostProps;
}
