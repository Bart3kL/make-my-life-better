import { type FormState, type FormProps } from "../types";

export interface AuthInputsProps {
	state: FormState;
	config: FormProps;
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
