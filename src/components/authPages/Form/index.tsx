"use client";
import React from "react";
import Link from "next/link";

import { AuthLabel } from "@/components/shared/AuthLabel";
import { AuthInput } from "@/components/shared/AuthInput";
import { FormProps } from "./types";
import { cn } from "@/lib/utils";

export function Form({ isSignInPage, isResetPasswordPage }: FormProps) {
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("Form submitted");
	};
	return (
		<div className="shadow-input mx-auto w-full max-w-md rounded-2xl bg-white p-4 md:p-8 dark:bg-black">
			<form className="my-8" onSubmit={handleSubmit}>
				{!isSignInPage && !isResetPasswordPage && (
					<div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
						<LabelInputContainer>
							<AuthLabel htmlFor="firstname">First name</AuthLabel>
							<AuthInput id="firstname" placeholder="Tyler" type="text" />
						</LabelInputContainer>
						<LabelInputContainer>
							<AuthLabel htmlFor="lastname">Last name</AuthLabel>
							<AuthInput id="lastname" placeholder="Durden" type="text" />
						</LabelInputContainer>
					</div>
				)}
				<LabelInputContainer className="mb-4">
					<AuthLabel htmlFor="email">Email Address</AuthLabel>
					<AuthInput id="email" placeholder="projectmayhem@fc.com" type="email" />
				</LabelInputContainer>
				{!isResetPasswordPage && (
					<LabelInputContainer className="mb-4">
						<AuthLabel htmlFor="password">Password</AuthLabel>
						<AuthInput id="password" placeholder="••••••••" type="password" />
					</LabelInputContainer>
				)}
				{!isSignInPage && !isResetPasswordPage && (
					<LabelInputContainer className="mb-8">
						<AuthLabel htmlFor="repeatPassword">Repeat password</AuthLabel>
						<AuthInput id="repeatPassword" placeholder="••••••••" type="repeatPassword" />
					</LabelInputContainer>
				)}

				<button
					className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
					type="submit"
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
					{/* <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              GitHub
            </span>
            <BottomGradient />
          </button>
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
          </button>
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandOnlyfans className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              OnlyFans
            </span>
            <BottomGradient />
          </button> */}
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
