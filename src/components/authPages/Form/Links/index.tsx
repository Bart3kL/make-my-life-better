import React from "react";
import Link from "next/link";

import { LinksProps } from "./types";

export const Links = ({
	isSignInPage,
	isResetPasswordPage,
	isEnterNewPasswordPage,
	passwordResetLinkMessage,
}: LinksProps) => {
	const getLinkDetails = () => {
		switch (true) {
			case isSignInPage:
				return [
					{
						message: "Don't have an account?",
						linkText: "Sign up",
						href: "/signup",
					},
					{
						message: "Forgot your password?",
						linkText: "Reset it",
						href: "/reset",
					},
				];
			case isResetPasswordPage:
				return [
					{
						message: "Remembered your password?",
						linkText: "Sign in",
						href: "/signin",
					},
				];
			case isEnterNewPasswordPage:
				return [
					{
						message: "Know your password?",
						linkText: "Sign in",
						href: "/signin",
					},
				];
			default:
				return [
					{
						message: "Already have an account?",
						linkText: "Sign in",
						href: "/signin",
					},
				];
		}
	};

	return (
		<div className="mt-5 flex flex-col space-y-4">
			{passwordResetLinkMessage && (
				<div className="mt-2 text-center text-green-600 dark:text-green-400">
					{passwordResetLinkMessage}
				</div>
			)}
			{getLinkDetails().map(({ message, linkText, href }) => (
				<p key={href}>
					{message}{" "}
					<Link href={href} className="text-neutral-700 underline dark:text-neutral-300">
						{linkText}
					</Link>
				</p>
			))}
		</div>
	);
};
