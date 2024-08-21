import { AuthInput } from "@/components/shared/AuthInput";
import { AuthLabel } from "@/components/shared/AuthLabel";
import { LabelInputContainer } from "@/components/shared/LabelInputContainer";

import { PasswordResetFieldsProps } from "./types";

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
