export interface ImageProps {
	image: File | null;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	handleImageUpload: (newFiles: any) => void;
	handleImageDelete: (fileToDelete: File) => void;
	handleSubmit: () => void;
	error?: string;
}
