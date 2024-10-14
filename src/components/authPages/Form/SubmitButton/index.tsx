import React from "react";
import { type SubmitButtonProps } from "./types";
import { Spinner } from "@/components/shared/Spinner";

export const SubmitButton: React.FC<SubmitButtonProps> = ({ state, config }) => {
	const { isSignInPage, isResetPasswordPage, isEnterNewPasswordPage } = config;

	const getButtonText = () => {
		if (state.isSubmitting) {
			return "Loading";
		}

		if (isSignInPage) {
			return "Sign in";
		}

		if (isResetPasswordPage) {
			return "Reset password";
		}

		if (isEnterNewPasswordPage) {
			return `Set new password`;
		}

		return "Sign up";
	};

	return (
		<button
			className="group/btn relative flex h-10 w-full items-center justify-center rounded-md bg-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-900 font-medium text-white shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
			type="submit"
			disabled={state.isSubmitting}
		>
			{state.isSubmitting ? <Spinner /> : getButtonText()}
			<span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent text-white opacity-0 transition duration-500 group-hover/btn:opacity-100" />
			<span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
		</button>
	);
};
