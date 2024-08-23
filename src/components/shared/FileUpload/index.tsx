import { cn } from "@/lib/utils";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { AiOutlineUpload, AiOutlineDelete } from "react-icons/ai";
import { useDropzone } from "react-dropzone";

const mainVariant = {
	initial: {
		x: 0,
		y: 0,
	},
	animate: {
		x: 20,
		y: -20,
		opacity: 0.9,
	},
};

const secondaryVariant = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
	},
};

export const FileUpload = ({
	onChange,
	onDelete,
	files,
}: {
	onChange?: (newFiles: File[]) => void;
	onDelete?: (fileToDelete: File) => void;
	files: File[];
}) => {
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

	return (
		<div className="w-full" {...getRootProps()}>
			<motion.div
				onClick={handleClick}
				whileHover="animate"
				className="group/file relative block w-full cursor-pointer overflow-hidden rounded-lg pb-10 pt-10"
			>
				<input
					{...getInputProps()}
					id="file-upload-handle"
					type="file"
					ref={fileInputRef}
					onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
					className="hidden"
					multiple
				/>
				<div className="flex flex-col items-center justify-center">
					<p className="relative z-20 font-sans text-base font-bold text-neutral-700 dark:text-neutral-300">
						Upload file (only .txt)
					</p>
					<p className="relative z-20 mt-2 font-sans text-base font-normal text-neutral-400 dark:text-neutral-400">
						Drag or drop your files here or click to upload
					</p>
					<div className="relative mx-auto mt-10 w-full max-w-xl">
						{files.length > 0 &&
							files.map((file, idx) => (
								<motion.div
									key={"file" + idx}
									layoutId={idx === 0 ? "file-upload" : "file-upload-" + idx}
									className={cn(
										"relative z-40 mx-auto mt-4 flex w-full flex-col items-start justify-start overflow-hidden rounded-md bg-white p-4 dark:bg-neutral-900",
										"shadow-sm",
									)}
								>
									<div className="flex w-full items-center justify-between gap-4">
										<motion.p
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											layout
											className="max-w-xs truncate text-base text-neutral-700 dark:text-neutral-300"
										>
											{file.name}
										</motion.p>
										<motion.p
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											layout
											className="w-fit flex-shrink-0 rounded-lg px-2 py-1 text-sm text-neutral-600 shadow-input dark:bg-neutral-800 dark:text-white"
										>
											{(file.size / (1024 * 1024)).toFixed(2)} MB
										</motion.p>
									</div>

									<div className="mt-2 flex w-full flex-col items-start justify-between text-sm text-neutral-600 md:flex-row md:items-center dark:text-neutral-400">
										<motion.p
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											layout
											className="rounded-md bg-gray-100 px-1 py-0.5 dark:bg-neutral-800"
										>
											{file.type}
										</motion.p>

										<motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} layout>
											modified {new Date(file.lastModified).toLocaleDateString()}
										</motion.p>
									</div>
									<button
										className="mt-2 rounded bg-red-500 p-1 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-500"
										onClick={(e) => handleDelete(e, file)}
									>
										<AiOutlineDelete />
									</button>
								</motion.div>
							))}
						{!files.length && (
							<motion.div
								layoutId="file-upload"
								variants={mainVariant}
								transition={{
									type: "spring",
									stiffness: 300,
									damping: 20,
								}}
								className={cn(
									"relative z-40 mx-auto mt-4 flex h-32 w-full max-w-[8rem] items-center justify-center rounded-md bg-white group-hover/file:shadow-2xl dark:bg-neutral-900",
									"shadow-[0px_10px_50px_rgba(0,0,0,0.1)]",
								)}
							>
								{isDragActive ? (
									<motion.p
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										className="flex flex-col items-center text-neutral-600"
									>
										Drop it
										<AiOutlineUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
									</motion.p>
								) : (
									<AiOutlineUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
								)}
							</motion.div>
						)}

						{fileRejections.length > 0 && (
							<div>
								<h4>Rejected files:</h4>
								{fileRejections.map(({ file, errors }) => (
									<div key={file.name}>
										<p>
											{file.name} - {file.size} bytes
										</p>
										<ul>
											{errors.map((e) => (
												<li key={e.code}>{e.message}</li>
											))}
										</ul>
									</div>
								))}
							</div>
						)}

						{!files.length && (
							<motion.div
								variants={secondaryVariant}
								className="absolute inset-0 z-30 mx-auto mt-4 flex h-32 w-full max-w-[8rem] items-center justify-center rounded-md border border-dashed border-sky-400 bg-transparent opacity-0"
							></motion.div>
						)}
					</div>
				</div>
			</motion.div>
		</div>
	);
};
