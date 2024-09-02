import { AnimatePresence, motion } from "framer-motion";

import Image from "next/image";

import { type CardProps } from "./types";

export const Card = ({ idx, title, id, image, hoveredIndex, setHoveredIndex }: CardProps) => {
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
					<div className="">
						<h4 className={"mb-6 text-xl font-bold tracking-wide text-midnight"}>{title}</h4>
						<Image src={image} alt={title} width={200} height={200} />
					</div>
					<div className="mt-3 flex justify-between">
						<a
							href={`/blog/post/${id}`}
							className="rounded-2xl p-2 transition-all hover:bg-blue-2 hover:text-white"
						>
							Edit
						</a>
						<a
							href={`/blog/post/${id}/preview`}
							className="rounded-2xl p-2 transition-all hover:bg-blue-2 hover:text-white"
						>
							Preview
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};
