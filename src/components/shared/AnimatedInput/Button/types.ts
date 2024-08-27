import { type MouseEvent } from "react";

export interface ButtonProps {
	value: string;
	handleSubmit: (e: MouseEvent<HTMLButtonElement>) => void;
}
