export interface PlaceholdersAndVanishInputProps {
	id?: string;
	placeholders: string[];
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSubmit: () => void;
}

export interface UseCanvasDrawProps {
	value: string;
	setValue: (val: string) => void;
	setAnimating: (val: boolean) => void;
	inputRef: React.RefObject<HTMLInputElement>;
}
export interface PixelData {
	x: number;
	y: number;
	color: string;
	r: number;
}
