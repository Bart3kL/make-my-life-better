import { PasswordResetFields } from "./PasswordResetFields";
import { AuthInputs } from "./AuthInputs";
import { SubmitButton } from "./SubmitButton";

import { type FormProps } from "./types";
import { useForm } from "./hooks";
import { Links } from "@/components/authPages/Form/Links";

export function Form({ isSignInPage, isResetPasswordPage, isEnterNewPasswordPage }: FormProps) {
	const { state, handleChange, handleSubmit, passwordResetLinkMessage } = useForm({
		isSignInPage,
		isResetPasswordPage,
		isEnterNewPasswordPage,
	});

	return (
		<div className="mx-auto w-full max-w-md rounded-2xl bg-black p-4 shadow-input md:p-8">
			<form className="my-8" onSubmit={handleSubmit}>
				{isEnterNewPasswordPage ? (
					<PasswordResetFields state={state} handleChange={handleChange} />
				) : (
					<AuthInputs
						state={state}
						handleChange={handleChange}
						config={{ isSignInPage, isResetPasswordPage, isEnterNewPasswordPage }}
					/>
				)}

				<SubmitButton
					state={state}
					config={{ isSignInPage, isResetPasswordPage, isEnterNewPasswordPage }}
				/>
				{state.errors.form && (
					<p className="mb-4 mt-5 text-center text-red-500">{state.errors.form}</p>
				)}
				<Links
					isSignInPage={isSignInPage}
					isResetPasswordPage={isResetPasswordPage}
					isEnterNewPasswordPage={isEnterNewPasswordPage}
					passwordResetLinkMessage={passwordResetLinkMessage}
				/>
			</form>
		</div>
	);
}
