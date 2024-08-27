import { useRef } from "react";

import { useDropzone } from "react-dropzone";

import { type UseFileUploadProps } from "./types";

export const useFileUpload = ({ onChange, onDelete, isImageUpload }: UseFileUploadProps) => {
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = (newFiles: File[]) => {
		if (isImageUpload) {
			onChange && newFiles.length > 0 && onChange(newFiles[0]);
		} else {
			onChange && onChange(newFiles);
		}
	};

	const handleDelete = (e: React.MouseEvent, fileToDelete: File) => {
		e.stopPropagation();

		onDelete && onDelete(fileToDelete);
	};

	const handleClick = () => {
		fileInputRef.current?.click();
	};

	const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
		multiple: !isImageUpload,

		noClick: true,

		onDrop: handleFileChange,

		onDropRejected: (fileRejections) => {},

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
