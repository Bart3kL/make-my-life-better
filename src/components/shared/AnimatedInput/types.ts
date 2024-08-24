export interface PlaceholdersAndVanishInputProps {
	id?: string;
	placeholders: string[];
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export interface UseCanvasDrawProps {
	value: string;
	setValue: (val: string) => void;
	setAnimating: (val: boolean) => void;
	inputRef: React.RefObject<HTMLInputElement>;
}
