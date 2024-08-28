import { useReducer } from "react";

import { stepsReducer, initialState } from "./actions";

export const useStepsReducer = () => {
	const [state, dispatch] = useReducer(stepsReducer, initialState);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch({
			type: "SET_FIELD",
			field: event.target.id ?? event.target.name,
			value: event.target.value,
		});
	};

	const handleNextStep = () => {
		dispatch({ type: "SET_STEP", payload: state.currentStep + 1 });
	};

	return {
		handleNextStep,
		state,
		handleChange,
	};
};
