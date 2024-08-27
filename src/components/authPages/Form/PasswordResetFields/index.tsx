import { type PasswordResetFieldsProps } from "./types";
import { AuthInput } from "@/components/shared/Input";
import { AuthLabel } from "@/components/shared/Label";
import { LabelInputContainer } from "@/components/shared/LabelInputContainer";


export const PasswordResetFields = ({ state, handleChange }: PasswordResetFieldsProps) => (
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
);
