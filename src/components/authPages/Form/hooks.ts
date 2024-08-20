import { useReducer, FormEvent } from "react";

import { FormState, FormProps } from "./types";

import { initialState, formReducer } from "./actions";

export function useForm({ isSignInPage, isResetPasswordPage }: FormProps) {
	const [state, dispatch] = useReducer(formReducer, initialState);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch({ type: "SET_FIELD", field: e.target.id, value: e.target.value });
	};

	const validate = (): Partial<FormState["errors"]> => {
		const errors: Partial<FormState["errors"]> = {};

		if (!state.email) {
			errors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(state.email)) {
			errors.email = "Email address is invalid";
		}

		if (!isSignInPage && !isResetPasswordPage) {
			if (!state.firstname) {
				errors.firstname = "First name is required";
			}
			if (!state.lastname) {
				errors.lastname = "Last name is required";
			}
		}

		if (!isResetPasswordPage) {
			if (!state.password) {
				errors.password = "Password is required";
			} else if (state.password.length < 6) {
				errors.password = "Password must be at least 6 characters";
			}

			if (!isSignInPage) {
				if (state.password !== state.repeatPassword) {
					errors.repeatPassword = "Passwords don't match";
				}
				if (!state.repeatPassword) {
					errors.repeatPassword = "Repeat password is required";
				}
			}
		}

		return errors;
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const errors = validate();
		if (Object.keys(errors).length > 0) {
			dispatch({ type: "SET_ERRORS", errors });
			return;
		}

		dispatch({ type: "SET_IS_SUBMITTING", isSubmitting: true });
		try {
			// Perform form submission logic here
			console.log("Form submitted", state);

			// Reset form if needed
			dispatch({ type: "RESET_FORM" });
		} catch (error) {
			console.error("Form submission error", error);
		} finally {
			dispatch({ type: "SET_IS_SUBMITTING", isSubmitting: false });
		}
	};

	return {
		state,
		handleChange,
		handleSubmit,
	};
}
