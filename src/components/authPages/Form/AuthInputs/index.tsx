import { type AuthInputsProps } from "./types";
import { Input } from "@/components/shared/Input";
import { Label } from "@/components/shared/Label";
import { LabelInputContainer } from "@/components/shared/LabelInputContainer";


export const AuthInputs = ({ state, handleChange, config }: AuthInputsProps) => {
	const { isSignInPage, isResetPasswordPage, isEnterNewPasswordPage } = config;

	return (
		<>
			{!(isSignInPage || isResetPasswordPage) && (
				<div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
					<LabelInputContainer>
						<Label htmlFor="firstname">First name</Label>
						<Input
							id="firstname"
							placeholder="Tyler"
							type="text"
							value={state.firstname}
							onChange={handleChange}
							error={state.errors.firstname}
						/>
					</LabelInputContainer>
					<LabelInputContainer>
						<Label htmlFor="lastname">Last name</Label>
						<Input
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
				<Label htmlFor="email">Email Address</Label>
				<Input
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
					<Label htmlFor="password">Password</Label>
					<Input
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
					<Label htmlFor="repeatPassword">Repeat password</Label>
					<Input
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
