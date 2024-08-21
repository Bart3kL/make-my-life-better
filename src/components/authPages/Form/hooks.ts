import { useReducer, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { FormState, FormProps } from "./types";
import { initialState, formReducer } from "./actions";

export function useForm({ isSignInPage, isResetPasswordPage, isEnterNewPasswordPage }: FormProps) {
	const [state, dispatch] = useReducer(formReducer, initialState);
	const searchParams = useSearchParams();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch({ type: "SET_FIELD", field: e.target.id, value: e.target.value });
	};

	useEffect(() => {
		if (isEnterNewPasswordPage) {
			const token = searchParams.get("token");
			if (token) {
				dispatch({ type: "SET_FIELD", field: "token", value: token });
			}
		}
	}, [isEnterNewPasswordPage, searchParams]);

	const validate = (): Partial<FormState["errors"]> => {
		const errors: Partial<FormState["errors"]> = {};

		if (isEnterNewPasswordPage) {
			if (!state.newPassword) {
				errors.newPassword = "New password is required";
			} else if (state.newPassword.length < 6) {
				errors.newPassword = "Password must be at least 6 characters";
			}
			if (state.newPassword !== state.repeatNewPassword) {
				errors.repeatNewPassword = "Passwords don't match";
			}
			if (!state.repeatNewPassword) {
				errors.repeatNewPassword = "Repeat new password is required";
			}
		} else {
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
				if (!state.password) {
					errors.password = "Password is required";
				} else if (state.password.length < 6) {
					errors.password = "Password must be at least 6 characters";
				}

				if (state.password !== state.repeatPassword) {
					errors.repeatPassword = "Passwords don't match";
				}
				if (!state.repeatPassword) {
					errors.repeatPassword = "Repeat password is required";
				}
			}

			if (isSignInPage && !state.password) {
				errors.password = "Password is required";
			}
		}

		return errors;
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const errors = validate();
		if (Object.keys(errors).length > 0) {
			dispatch({ type: "SET_ERRORS", errors });
			return;
		}

		dispatch({ type: "SET_IS_SUBMITTING", isSubmitting: true });

		try {
			let response;

			if (isSignInPage) {
				// Sign in
				response = await fetch("/api/auth/signin", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: state.email,
						password: state.password,
					}),
				});
			} else if (isResetPasswordPage) {
				// Request reset password
				response = await fetch("/api/auth/request-reset", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: state.email,
					}),
				});
			} else if (isEnterNewPasswordPage) {
				// Set new password
				response = await fetch("/api/auth/reset", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						token: state.token,
						newPassword: state.newPassword,
					}),
				});
			} else {
				// Sign up
				response = await fetch("/api/auth/signup", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						firstname: state.firstname,
						lastname: state.lastname,
						email: state.email,
						password: state.password,
					}),
				});
			}

			const data = await response.json();

			if (!response.ok) {
				dispatch({ type: "SET_ERRORS", errors: { form: data.message } });
			} else {
				console.log("Form submitted successfully", data);
				dispatch({ type: "RESET_FORM" });
			}
		} catch (error) {
			console.error("Form submission error", error);
			dispatch({ type: "SET_ERRORS", errors: { form: "An error occurred. Please try again." } });
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
