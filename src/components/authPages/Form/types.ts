export interface FormState {
	firstname: string;
	lastname: string;
	email: string;
	password: string;
	repeatPassword: string;
	newPassword: string;
	repeatNewPassword: string;
	token: string;
	errors: Partial<{
		form: string;
		firstname: string;
		lastname: string;
		email: string;
		password: string;
		repeatPassword: string;
		newPassword: string;
		repeatNewPassword: string;
	}>;
	isSubmitting: boolean;
}

export interface FormProps {
	isSignInPage?: boolean;
	isResetPasswordPage?: boolean;
	isEnterNewPasswordPage?: boolean;
}

export type FormAction =
	| { type: "SET_FIELD"; field: string; value: string }
	| { type: "SET_ERRORS"; errors: Partial<FormState["errors"]> }
	| { type: "SET_IS_SUBMITTING"; isSubmitting: boolean }
	| { type: "RESET_FORM" };
