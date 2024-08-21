import { AuthInput } from "@/components/shared/AuthInput";
import { AuthLabel } from "@/components/shared/AuthLabel";
import { LabelInputContainer } from "@/components/shared/LabelInputContainer";

import { AuthInputsProps } from "./types";

export const AuthInputs = ({ state, handleChange, config }: AuthInputsProps) => {
	const { isSignInPage, isResetPasswordPage, isEnterNewPasswordPage } = config;

	return (
		<>
			{!(isSignInPage || isResetPasswordPage) && (
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
			{!(isResetPasswordPage || isEnterNewPasswordPage) && (
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
			{!(isSignInPage || isResetPasswordPage) && (
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
	);
};
