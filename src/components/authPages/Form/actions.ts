import { FormAction, FormState } from "./types";

export const initialState: FormState = {
	firstname: "",
	lastname: "",
	email: "",
	password: "",
	repeatPassword: "",
	errors: {},
	isSubmitting: false,
};

export function formReducer(state: FormState, action: FormAction): FormState {
	switch (action.type) {
		case "SET_FIELD":
			return { ...state, [action.field]: action.value };
		case "SET_ERRORS":
			return { ...state, errors: action.errors };
		case "SET_IS_SUBMITTING":
			return { ...state, isSubmitting: action.isSubmitting };
		case "RESET_FORM":
			return initialState;
		default:
			return state;
	}
}
