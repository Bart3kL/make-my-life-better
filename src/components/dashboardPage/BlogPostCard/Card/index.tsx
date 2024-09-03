import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import Image from "next/image";

import { DeletePostModal } from "./DeletePostModal";

import { type CardProps } from "./types";

export const Card = ({
	idx,
	title,
	id,
	image,
	hoveredIndex,
	setHoveredIndex,
	token,
}: CardProps) => {
	const [open, setOpen] = useState(false);

	return (
		<div
			className="group relative block h-full w-full p-2"
			onMouseEnter={() => setHoveredIndex(idx)}
			onMouseLeave={() => setHoveredIndex(null)}
		>
			<AnimatePresence>
				{hoveredIndex === idx && (
					<motion.span
						className="absolute inset-0 block h-full w-full rounded-3xl bg-blue-2"
						layoutId="hoverBackground"
						initial={{ opacity: 0 }}
						animate={{
							opacity: 1,
							transition: { duration: 0.15 },
						}}
						exit={{
							opacity: 0,
							transition: { duration: 0.15, delay: 0.2 },
						}}
					/>
				)}
			</AnimatePresence>
			<div
				className={
					"border-red relative z-20 h-full w-full overflow-hidden rounded-2xl border-2 bg-white p-4"
				}
			>
				<div className="relative z-50 flex h-full flex-col justify-between">
					<div className="flex flex-col items-center">
						<div>
							<h4 className={"mb-6 text-xl font-bold tracking-wide text-midnight"}>{title}</h4>
						</div>
						<Image src={image} alt={title} width={200} height={200} className="w-fit" />
					</div>
					<div className="mt-3 flex justify-between">
						<div className="mt-3 flex gap-3">
							<a
								href={`/blog/post/${id}`}
								className="rounded-2xl bg-blue-2 p-2 text-sm text-white transition-all hover:bg-blue-2"
							>
								Edit
							</a>
							<a
								href={`/blog/post/${id}/preview`}
								className="rounded-2xl bg-blue-2 p-2 text-sm text-white transition-all hover:bg-blue-2"
							>
								Preview
							</a>
						</div>
						<button
							className="mt-3 rounded-2xl p-2 transition-all hover:bg-red-700 hover:text-white"
							onClick={() => setOpen(true)}
						>
							<RiDeleteBin5Line />
						</button>
					</div>
				</div>
			</div>
			<DeletePostModal isOpen={open} handleClose={() => setOpen(false)} postId={id} token={token} />
		</div>
	);
};
