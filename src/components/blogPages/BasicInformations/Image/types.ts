export interface ImageProps {
	image: File | null;
	handleImageUpload: (newFiles: any) => void;
	handleImageDelete: (fileToDelete: File) => void;
	handleSubmit: () => void;
	error?: string;
}
