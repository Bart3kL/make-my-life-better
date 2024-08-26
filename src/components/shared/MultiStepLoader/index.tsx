"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";

import { Portal } from "@mui/material";
import { LoaderCore } from "./LoaderCore";

import { MultiStepLoaderProps } from "./types";

export const MultiStepLoader = ({
	loadingStates,
	loading,
	duration = 200,
	loop = true,
}: MultiStepLoaderProps) => {
	const [currentState, setCurrentState] = useState(0);

	useEffect(() => {
		if (!loading) {
			setCurrentState(0);
			return;
		}
		const timeout = setTimeout(() => {
			setCurrentState((prevState) =>
				loop
					? prevState === loadingStates.length - 1
						? 0
						: prevState + 1
					: Math.min(prevState + 1, loadingStates.length - 1),
			);
		}, duration);

		return () => clearTimeout(timeout);
	}, [currentState, loading, loop, loadingStates.length, duration]);

	if (typeof window === "undefined") return null;

	return (
		<Portal>
			<AnimatePresence mode="wait">
				{loading && (
					<motion.div
						initial={{
							opacity: 0,
						}}
						animate={{
							opacity: 1,
						}}
						className="fixed top-0 z-[100] flex h-full w-full items-center justify-center bg-blue-2"
					>
						<div className="relative flex h-96 items-center justify-center">
							<LoaderCore value={currentState} loadingStates={loadingStates} />
						</div>

						<div className="absolute z-20 bg-black bg-gradient-to-t opacity-80" />
					</motion.div>
				)}
			</AnimatePresence>
		</Portal>
	);
};
