export interface FileUploadProps {
	onChange?: (newFiles: File[]) => void;
	onDelete?: (fileToDelete: File) => void;
	files: File[];
}

export interface UseFileUploadProps {
	onChange: FileUploadProps["onChange"];
	onDelete: FileUploadProps["onDelete"];
}
