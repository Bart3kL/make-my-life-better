"use client";

import { motion } from "framer-motion";

import { type TypewriterEffectSmoothProps } from "@/components/shared/TypewriterEffectSmooth/types";
import { cn } from "@/lib/utils";

export const TypewriterEffectSmooth = ({
	words,
	className,
	cursorClassName,
}: TypewriterEffectSmoothProps) => {
	const wordsArray = words.map((word) => {
		return {
			...word,
			text: word.text.split(""),
		};
	});
	const renderWords = () => {
		return (
			<div>
				{wordsArray.map((word, idx) => {
					return (
						<div key={`word-${idx}`} className="inline-block">
							{word.text.map((char, index) => (
								<span
									key={`char-${index}`}
									className={cn(`text-black dark:text-white`, word.className)}
								>
									{char}
								</span>
							))}
							&nbsp;
						</div>
					);
				})}
			</div>
		);
	};

	return (
		<div className={cn("my-6 flex justify-center space-x-1", className)}>
			<motion.div
				className="overflow-hidden pb-2"
				initial={{
					width: "0%",
				}}
				whileInView={{
					width: "fit-content",
				}}
				transition={{
					duration: 2,
					ease: "linear",
					delay: 1,
				}}
			>
				<div
					className="text-2xl font-bold sm:text-5xl"
					style={{
						whiteSpace: "nowrap",
					}}
				>
					{renderWords()}{" "}
				</div>{" "}
			</motion.div>
			<motion.span
				initial={{
					opacity: 0,
				}}
				animate={{
					opacity: 1,
				}}
				transition={{
					duration: 0.8,

					repeat: Infinity,
					repeatType: "reverse",
				}}
				className={cn("block h-7 w-[4px] rounded-sm bg-blue-500 sm:h-12", cursorClassName)}
			/>
		</div>
	);
};
