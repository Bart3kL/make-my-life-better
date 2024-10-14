import { motion } from "framer-motion";
import { AiOutlineUpload } from "react-icons/ai";

import { type UploadAreaProps } from "./types";
import { mainVariant } from "./constans";
import { cn } from "@/lib/utils";

export const UploadArea = ({ isDragActive }: UploadAreaProps) => {
	return (
		<motion.div
			layoutId="file-upload"
			variants={mainVariant}
			transition={{
				type: "spring",
				stiffness: 300,
				damping: 20,
			}}
			className={cn(
				"relative z-40 mx-auto mt-4 flex h-32 w-full max-w-[8rem] items-center justify-center rounded-md bg-neutral-900 group-hover/file:shadow-2xl",
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
					<AiOutlineUpload className="h-4 w-4 text-neutral-400" />
				</motion.p>
			) : (
				<AiOutlineUpload className="h-4 w-4 text-neutral-300" />
			)}
		</motion.div>
	);
};
