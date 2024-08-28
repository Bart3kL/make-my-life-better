export interface FileUploadContainerProps {
	files: File[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	handleFileUpload: (newFiles: any) => void;
	handleFileDelete: (fileToDelete: File) => void;
}
