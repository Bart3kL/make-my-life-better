import Link from "next/link";
import { AuthLabel } from "@/components/shared/AuthLabel";
import { AuthInput } from "@/components/shared/AuthInput";
import { FormProps } from "./types";
import { cn } from "@/lib/utils";
import { useForm } from "./hooks";

export function Form({ isSignInPage, isResetPasswordPage, isEnterNewPasswordPage }: FormProps) {
	const { state, handleChange, handleSubmit } = useForm({
		isSignInPage,
		isResetPasswordPage,
		isEnterNewPasswordPage,
	});

	return (
		<div className="mx-auto w-full max-w-md rounded-2xl bg-white p-4 shadow-input md:p-8 dark:bg-black">
			<form className="my-8" onSubmit={handleSubmit}>
				{state.errors.form && (
					<p className="mb-4 text-red-600 dark:text-red-500">{state.errors.form}</p>
				)}
				{isEnterNewPasswordPage ? (
					<>
						<LabelInputContainer className="mb-4">
							<AuthLabel htmlFor="newPassword">Enter new password</AuthLabel>
							<AuthInput
								id="newPassword"
								placeholder="••••••••"
								type="password"
								value={state.newPassword}
								onChange={handleChange}
								error={state.errors.newPassword}
							/>
						</LabelInputContainer>
						<LabelInputContainer className="mb-4">
							<AuthLabel htmlFor="repeatNewPassword">Repeat new password</AuthLabel>
							<AuthInput
								id="repeatNewPassword"
								placeholder="••••••••"
								type="password"
								value={state.repeatNewPassword}
								onChange={handleChange}
								error={state.errors.repeatNewPassword}
							/>
						</LabelInputContainer>
					</>
				) : (
					<>
						{!isSignInPage && !isResetPasswordPage && (
							<div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
								<LabelInputContainer>
									<AuthLabel htmlFor="firstname">First name</AuthLabel>
									<AuthInput
										id="firstname"
										placeholder="Tyler"
										type="text"
										value={state.firstname}
										onChange={handleChange}
										error={state.errors.firstname}
									/>
								</LabelInputContainer>
								<LabelInputContainer>
									<AuthLabel htmlFor="lastname">Last name</AuthLabel>
									<AuthInput
										id="lastname"
										placeholder="Durden"
										type="text"
										value={state.lastname}
										onChange={handleChange}
										error={state.errors.lastname}
									/>
								</LabelInputContainer>
							</div>
						)}
						<LabelInputContainer className="mb-4">
							<AuthLabel htmlFor="email">Email Address</AuthLabel>
							<AuthInput
								id="email"
								placeholder="projectmayhem@fc.com"
								type="email"
								value={state.email}
								onChange={handleChange}
								error={state.errors.email}
							/>
						</LabelInputContainer>
						{!isResetPasswordPage && !isEnterNewPasswordPage && (
							<LabelInputContainer className="mb-4">
								<AuthLabel htmlFor="password">Password</AuthLabel>
								<AuthInput
									id="password"
									placeholder="••••••••"
									type="password"
									value={state.password}
									onChange={handleChange}
									error={state.errors.password}
								/>
							</LabelInputContainer>
						)}
						{!isSignInPage && !isResetPasswordPage && (
							<LabelInputContainer className="mb-8">
								<AuthLabel htmlFor="repeatPassword">Repeat password</AuthLabel>
								<AuthInput
									id="repeatPassword"
									placeholder="••••••••"
									type="password"
									value={state.repeatPassword}
									onChange={handleChange}
									error={state.errors.repeatPassword}
								/>
							</LabelInputContainer>
						)}
					</>
				)}

				<button
					className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
					type="submit"
					disabled={state.isSubmitting}
				>
					{isSignInPage
						? "Sign in "
						: isResetPasswordPage
							? "Reset password "
							: isEnterNewPasswordPage
								? "Set new password "
								: "Sign up "}{" "}
					&rarr;
					<span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
					<span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
				</button>
			</form>
		</div>
	);
}

const LabelInputContainer = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return <div className={cn("flex w-full flex-col space-y-2", className)}>{children}</div>;
};
