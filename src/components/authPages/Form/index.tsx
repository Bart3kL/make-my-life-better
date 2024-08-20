import { FormEvent } from "react";
import Link from "next/link";

import { AuthLabel } from "@/components/shared/AuthLabel";
import { AuthInput } from "@/components/shared/AuthInput";
import { FormProps } from "./types";
import { cn } from "@/lib/utils";
import { useForm } from "./hooks"; // Importujemy nasz nowy hook

export function Form({ isSignInPage, isResetPasswordPage }: FormProps) {
	const { state, handleChange, handleSubmit } = useForm({ isSignInPage, isResetPasswordPage });

	return (
		<div className="shadow-input mx-auto w-full max-w-md rounded-2xl bg-white p-4 md:p-8 dark:bg-black">
			<form className="my-8" onSubmit={handleSubmit}>
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
							/>
							{state.errors.firstname && (
								<span className="text-red-500">{state.errors.firstname}</span>
							)}
						</LabelInputContainer>
						<LabelInputContainer>
							<AuthLabel htmlFor="lastname">Last name</AuthLabel>
							<AuthInput
								id="lastname"
								placeholder="Durden"
								type="text"
								value={state.lastname}
								onChange={handleChange}
							/>
							{state.errors.lastname && (
								<span className="text-red-500">{state.errors.lastname}</span>
							)}
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
					/>
					{state.errors.email && <span className="text-red-500">{state.errors.email}</span>}
				</LabelInputContainer>
				{!isResetPasswordPage && (
					<LabelInputContainer className="mb-4">
						<AuthLabel htmlFor="password">Password</AuthLabel>
						<AuthInput
							id="password"
							placeholder="••••••••"
							type="password"
							value={state.password}
							onChange={handleChange}
						/>
						{state.errors.password && <span className="text-red-500">{state.errors.password}</span>}
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
						/>
						{state.errors.repeatPassword && (
							<span className="text-red-500">{state.errors.repeatPassword}</span>
						)}
					</LabelInputContainer>
				)}

				<button
					className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
					type="submit"
					disabled={state.isSubmitting}
				>
					{isSignInPage ? "Sign in " : isResetPasswordPage ? "Reset password " : "Sign up "} &rarr;
					<BottomGradient />
				</button>

				<div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

				<div className="flex flex-col space-y-4">
					<p>
						{isSignInPage ? "Don't have an account?" : "Already have an account?"}{" "}
						<Link
							href={isSignInPage ? "/signup" : "/signin"}
							className="text-neutral-700 underline dark:text-neutral-300"
						>
							{isSignInPage ? "Sign up" : "Sign in"}
						</Link>
						{isSignInPage && (
							<p>
								Forgot your password?{" "}
								<Link href="/reset" className="text-neutral-700 underline dark:text-neutral-300">
									Reset it
								</Link>{" "}
							</p>
						)}
					</p>
				</div>
			</form>
		</div>
	);
}

const BottomGradient = () => {
	return (
		<>
			<span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
			<span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
		</>
	);
};

const LabelInputContainer = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return <div className={cn("flex w-full flex-col space-y-2", className)}>{children}</div>;
};
