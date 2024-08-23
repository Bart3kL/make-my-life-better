import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { useCanvasDraw, usePlaceholderAnimation } from "./hooks";

export function PlaceholdersAndVanishInput({
	placeholders,
	onChange,
	id,
	onSubmit,
}: {
	id?: string;
	placeholders: string[];
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
	const [value, setValue] = useState("");
	const [animating, setAnimating] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const { currentPlaceholder } = usePlaceholderAnimation(placeholders);
	const { canvasRef, draw, vanishAndSubmit } = useCanvasDraw(
		value,
		setValue,
		setAnimating,
		inputRef,
	);

	useEffect(() => {
		draw();
	}, [value, draw]);

	const handleSubmit = (e: any) => {
		e.preventDefault();
		vanishAndSubmit(() => {
			if (onSubmit) {
				onSubmit(e);
			}
		});
	};

	return (
		<div
			className={cn(
				"relative mx-auto h-12 w-full max-w-xl overflow-hidden rounded-full border-2 border-blue-2 bg-white-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),_0px_1px_0px_0px_rgba(25,28,33,0.02),_0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-200",
			)}
		>
			<canvas
				className={cn(
					"pointer-events-none absolute left-2 top-[20%] origin-top-left scale-50 transform pr-20 text-base invert filter sm:left-8 dark:invert-0",
					!animating ? "opacity-0" : "opacity-100",
				)}
				ref={canvasRef}
			/>
			<input
				onChange={(e) => {
					if (!animating) {
						setValue(e.target.value);
						onChange && onChange(e);
					}
				}}
				// onKeyDown={handleKeyDown}
				ref={inputRef}
				value={value}
				type="text"
				id={id}
				className={cn(
					"relative z-50 h-full w-full rounded-full border-none bg-transparent pl-4 pr-20 text-sm text-midnight focus:outline-none focus:ring-0 sm:pl-10 sm:text-base",
					animating && "text-transparent dark:text-transparent",
				)}
			/>

			<button
				onClick={handleSubmit}
				disabled={!value}
				type="submit"
				className="absolute right-2 top-1/2 z-50 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-midnight transition duration-200 disabled:bg-blue-2"
			>
				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="h-4 w-4 text-white"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<motion.path
						d="M5 12l14 0"
						initial={{
							strokeDasharray: "50%",
							strokeDashoffset: "50%",
						}}
						animate={{
							strokeDashoffset: value ? 0 : "50%",
						}}
						transition={{
							duration: 0.3,
							ease: "linear",
						}}
					/>
					<path d="M13 18l6 -6" />
					<path d="M13 6l6 6" />
				</motion.svg>
			</button>

			<div className="pointer-events-none absolute inset-0 flex items-center rounded-full">
				<AnimatePresence mode="wait">
					{!value && (
						<motion.p
							initial={{
								y: 5,
								opacity: 0,
							}}
							key={`current-placeholder-${currentPlaceholder}`}
							animate={{
								y: 0,
								opacity: 1,
							}}
							exit={{
								y: -15,
								opacity: 0,
							}}
							transition={{
								duration: 0.3,
								ease: "linear",
							}}
							className="text-midnight0 w-[calc(100%-2rem)] truncate pl-4 text-left text-sm font-normal sm:pl-12 sm:text-base"
						>
							{placeholders[currentPlaceholder]}
						</motion.p>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}
