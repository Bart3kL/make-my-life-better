export interface FileProps {
	idx: number;
	file: File;
	handleDelete: (e: React.MouseEvent, fileToDelete: File) => void;
}
