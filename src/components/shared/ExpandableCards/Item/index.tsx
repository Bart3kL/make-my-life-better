import { motion } from "framer-motion";
import Image from "next/image";
import { ItemProps } from "./types";

export const Item = ({ card, id, setActive }: ItemProps) => {
	return (
		<motion.div
			layoutId={`card-${card.title}-${id}`}
			key={`card-${card.title}-${id}`}
			onClick={() => setActive(card)}
			className="group flex cursor-pointer flex-col items-center justify-between rounded-xl p-4 hover:bg-blue-2 hover:text-white md:flex-row"
		>
			<div className="flex flex-col gap-4 md:flex-row">
				<motion.div layoutId={`image-${card.title}-${id}`}>
					<Image
						width={100}
						height={100}
						src={card.src}
						alt={card.title}
						className="h-40 w-40 rounded-lg object-cover object-top md:h-14 md:w-14"
					/>
				</motion.div>
				<div className="">
					<motion.h3
						layoutId={`title-${card.title}-${id}`}
						className="text-center font-medium text-midnight group-hover:text-white md:text-left"
					>
						{card.title}
					</motion.h3>
					<motion.p
						layoutId={`createdat-${card.createdat}-${id}`}
						className="text-center text-midnight group-hover:text-white md:text-left"
					>
						{card.createdat}
					</motion.p>
				</div>
			</div>
			<motion.button
				layoutId={`button-${card.title}-${id}`}
				className="mt-4 rounded-full bg-gray-100 px-4 py-2 text-sm font-bold text-black hover:bg-green-500 hover:text-white md:mt-0"
			>
				Check structure
			</motion.button>
		</motion.div>
	);
};
