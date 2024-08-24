import { TabPanel } from "@mui/base";

import { FileUpload } from "@/components/shared/FileUpload";

export const FileUploadContainer = ({
	files,
	handleFileUpload,
	handleFileDelete,
}: {
	files: File[];
	handleFileUpload: (newFiles: File[]) => void;
	handleFileDelete: (fileToDelete: File) => void;
}) => {
	return (
		<TabPanel value={0}>
			<div className="mx-auto flex w-full max-w-xl flex-col justify-items-center">
				<FileUpload onChange={handleFileUpload} onDelete={handleFileDelete} files={files} />
			</div>
		</TabPanel>
	);
};
