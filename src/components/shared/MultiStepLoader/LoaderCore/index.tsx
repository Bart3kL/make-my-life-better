import { IoIosCheckmarkCircle, IoIosCheckmarkCircleOutline } from "react-icons/io";

import { motion } from "framer-motion";
import { type LoaderCoreProps } from "./types";
import { cn } from "@/lib/utils";

export const LoaderCore = ({ loadingStates, value = 0 }: LoaderCoreProps) => {
	return (
		<div className="relative mx-auto mt-20 flex max-w-xl flex-col justify-start">
			{loadingStates.map((loadingState, index) => {
				const distance = Math.abs(index - value);
				const opacity = Math.max(1 - distance * 0.2, 0);

				return (
					<motion.div
						key={index}
						className={"mb-4 flex gap-2 text-left"}
						initial={{ opacity: 0, y: -(value * 40) }}
						animate={{ opacity: opacity, y: -(value * 40) }}
						transition={{ duration: 0.2 }}
					>
						<div>
							{index > value && <IoIosCheckmarkCircleOutline className="h-6 w-6 text-white" />}
							{index <= value && (
								<IoIosCheckmarkCircle
									className={cn(
										"h-6 w-6 text-white",
										value === index && "text-lime-500 opacity-100",
									)}
								/>
							)}
						</div>
						<span className={cn("text-white", value === index && "text-lime-500 opacity-100")}>
							{loadingState.text}
						</span>
					</motion.div>
				);
			})}
		</div>
	);
};
