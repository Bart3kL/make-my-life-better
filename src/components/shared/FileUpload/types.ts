export interface FileUploadProps {
	onChange: (files: File[] | File) => void;
	onDelete: (fileToDelete: File) => void;
	files: File[];
	isImageUpload?: boolean;
}

export interface UseFileUploadProps {
	onChange: (files: File[] | File) => void;
	onDelete: (fileToDelete: File) => void;
	isImageUpload?: boolean;
}
