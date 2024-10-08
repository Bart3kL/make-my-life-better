import { type PasswordResetFieldsProps } from "./types";
import { Input } from "@/components/shared/Input";
import { Label } from "@/components/shared/Label";
import { LabelInputContainer } from "@/components/shared/LabelInputContainer";

export const PasswordResetFields = ({ state, handleChange }: PasswordResetFieldsProps) => (
	<>
		<LabelInputContainer className="mb-4">
			<Label htmlFor="newPassword">Enter new password</Label>
			<Input
				id="newPassword"
				placeholder="••••••••"
				type="password"
				value={state.newPassword}
				onChange={handleChange}
				error={state.errors.newPassword}
			/>
		</LabelInputContainer>
		<LabelInputContainer className="mb-4">
			<Label htmlFor="repeatNewPassword">Repeat new password</Label>
			<Input
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
