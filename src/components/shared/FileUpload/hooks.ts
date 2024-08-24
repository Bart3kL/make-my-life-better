import { useRef, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { UseFileUploadProps } from "./types";

export const useFileUpload = ({ onChange, onDelete }: UseFileUploadProps) => {
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = (newFiles: File[]) => {
		onChange && onChange(newFiles);
	};

	const handleDelete = (e: React.MouseEvent, fileToDelete: File) => {
		e.stopPropagation();
		onDelete && onDelete(fileToDelete);
	};

	const handleClick = () => {
		fileInputRef.current?.click();
	};

	const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
		multiple: true,
		noClick: true,
		onDrop: handleFileChange,
		onDropRejected: (fileRejections) => {
			console.log("Rejected files:", fileRejections);
		},
		accept: {
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
