import { type PostProps } from "@/components/shared/Editor/types";

export interface StepsState {
	headerLength: string;
	style: string;
	currentStep: number;
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
	  };

export interface StepsProps {
	token: string;
	blogPost: PostProps;
}
