import { motion } from "framer-motion";
import { AiOutlineDelete } from "react-icons/ai";

import { type FileProps } from "./types";
import { cn } from "@/lib/utils";

export const File = ({ idx, file, handleDelete }: FileProps) => {
	return (
		<motion.div
			key={"file" + idx}
			layoutId={idx === 0 ? "file-upload" : "file-upload-" + idx}
			className={cn(
				"relative z-40 mx-auto mt-4 flex w-full flex-col items-start justify-start overflow-hidden rounded-md bg-neutral-900",
				"shadow-sm",
			)}
		>
			<div className="flex w-full items-center justify-between gap-4">
				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					layout
					className="max-w-xs truncate text-base text-neutral-300"
				>
					{file.name}
				</motion.p>
				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					layout
					className="w-fit flex-shrink-0 rounded-lg bg-neutral-800 px-2 py-1 text-sm text-white shadow-input"
				>
					{(file.size / (1024 * 1024)).toFixed(2)} MB
				</motion.p>
			</div>

			<div className="mt-2 flex w-full flex-col items-start justify-between text-sm text-neutral-400 md:flex-row md:items-center">
				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					layout
					className="rounded-md bg-neutral-800 px-1 py-0.5"
				>
					{file.type}
				</motion.p>

				<motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} layout>
					modified {new Date(file.lastModified).toLocaleDateString()}
				</motion.p>
			</div>
			<button
				className="mt-2 rounded bg-red-700 text-white hover:bg-red-500"
				onClick={(e) => handleDelete(e, file)}
			>
				<AiOutlineDelete />
			</button>
		</motion.div>
	);
};
