import { type FormState } from "../types";

export interface PasswordResetFieldsProps {
	state: FormState;
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
