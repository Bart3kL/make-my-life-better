import { TabPanel } from "@mui/base";

import { type FileUploadContainerProps } from "./types";
import { FileUpload } from "@/components/shared/FileUpload";

export const FileUploadContainer = ({
	files,
	handleFileUpload,
	handleFileDelete,
}: FileUploadContainerProps) => {
	return (
		<TabPanel value={0}>
			<div className="mx-auto flex w-full max-w-xl flex-col justify-items-center">
				<FileUpload onChange={handleFileUpload} onDelete={handleFileDelete} files={files} />
			</div>
		</TabPanel>
	);
};
