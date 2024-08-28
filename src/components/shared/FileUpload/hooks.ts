import { useRef } from "react";

import { useDropzone } from "react-dropzone";

import { type UseFileUploadProps } from "./types";

export const useFileUpload = ({ onChange, onDelete, isImageUpload }: UseFileUploadProps) => {
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = (newFiles: File[]) => {
		if (isImageUpload) {
			if (newFiles.length > 0) {
				onChange(newFiles[0]);
			}
		} else {
			onChange(newFiles);
		}
	};

	const handleDelete = (e: React.MouseEvent, fileToDelete: File) => {
		e.stopPropagation();

		onDelete(fileToDelete);
	};

	const handleClick = () => {
		fileInputRef.current?.click();
	};

	const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
		multiple: !isImageUpload,
		noClick: true,
		onDrop: handleFileChange,
		onDropRejected: () => {},
		accept: isImageUpload
			? {
					"image/jpeg": [".jpeg", ".jpg"],
					"image/png": [".png"],
					"image/gif": [".gif"],
					"image/svg+xml": [".svg"],
					"image/webp": [".webp"],
				}
			: {
					"text/plain": [".txt"],
				},
	});

	return {
		fileInputRef,
		getRootProps,
		getInputProps,
		isDragActive,
		handleFileChange,
		handleDelete,
		handleClick,
		fileRejections,
	};
};
