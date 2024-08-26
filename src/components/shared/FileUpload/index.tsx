import { motion } from "framer-motion";
import { File } from "./File";
import { UploadArea } from "./UploadArea";
import { useFileUpload } from "./hooks";
import { FileUploadProps } from "./types";
import { RejectionInfo } from "./RejectionInfo";
import { secondaryVariant } from "./constants";

export const FileUpload = ({ onChange, onDelete, files, isImageUpload }: FileUploadProps) => {
	const {
		fileInputRef,
		getRootProps,
		getInputProps,
		isDragActive,
		handleFileChange,
		handleDelete,
		handleClick,
		fileRejections,
	} = useFileUpload({ onChange, onDelete, isImageUpload });

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
					multiple={!isImageUpload}
				/>
				<div className="flex flex-col items-center justify-center">
					<p className="relative z-20 font-sans text-base font-bold text-neutral-700 dark:text-neutral-300">
						{isImageUpload
							? "Upload image (only .jpeg, .png, .gif, .svg, .webp)"
							: "Upload file (only .txt)"}
					</p>
					<p className="relative z-20 mt-2 font-sans text-base font-normal text-neutral-400 dark:text-neutral-400">
						Drag or drop your {isImageUpload ? "image" : "files"} here or click to upload
					</p>
					<div className="relative mx-auto mt-10 w-full max-w-xl">
						{files.length > 0 &&
							files.map((file, idx) => (
								<File key={idx} idx={idx} file={file} handleDelete={handleDelete} />
							))}
						{!files.length && <UploadArea isDragActive={isDragActive} />}

						{fileRejections.length > 0 && (
							<div>
								<h4>Rejected files:</h4>
								{fileRejections.map(({ file, errors }) => (
									<RejectionInfo key={file.name} file={file} errors={errors} />
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
