export interface TextareaProps {
	value: number;
	placeholder: string;
	id: string;
	onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
	valueInput: string;
}
