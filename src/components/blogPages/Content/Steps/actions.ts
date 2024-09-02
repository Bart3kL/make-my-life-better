import { type StepsState, type FormAction } from "./types";

export const initialState: StepsState = {
	headerLength: "",
	style: "",
	currentStep: 1,
	loading: false,
};

export function stepsReducer(state: StepsState, action: FormAction) {
	switch (action.type) {
		case "SET_FIELD":
			return { ...state, [action.field]: action.value };
		case "SET_STEP":
			return { ...state, currentStep: action.payload };
		case "SET_LOADING":
			return { ...state, loading: action.loading };
		default:
			return state;
	}
}
