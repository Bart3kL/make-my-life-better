import { StepsState, FormAction } from "./types";

export const initialState: StepsState = {
	headerLength: "",
	style: "",
	currentStep: 1,
};

export function stepsReducer(state: StepsState, action: FormAction) {
	switch (action.type) {
		case "SET_FIELD":
			return { ...state, [action.field]: action.value };
		case "SET_STEP":
			return { ...state, currentStep: action.payload };

		default:
			return state;
	}
}
