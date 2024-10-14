"use client";

import * as React from "react";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";

import { type InputProps } from "./types";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(function InputComponent(
	{ className, type, error, ...props }: InputProps,
	ref: React.Ref<HTMLInputElement>,
) {
	const radius = 100;
	const [visible, setVisible] = React.useState<boolean>(false);

	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
		const { currentTarget, clientX, clientY } = event;
		const { left, top } = currentTarget.getBoundingClientRect();

		mouseX.set(clientX - left);
		mouseY.set(clientY - top);
	}
	return (
		<>
			<motion.div
				style={{
					background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
          var(--blue-500),
          transparent 80%
        )
      `,
				}}
				onMouseMove={handleMouseMove}
				onMouseEnter={() => setVisible(true)}
				onMouseLeave={() => setVisible(false)}
				className="group/input rounded-lg p-[2px] transition duration-300"
			>
				<input
					type={type}
					className={cn(
						`placeholder-text-neutral-600 flex h-10 w-full rounded-md border-none bg-zinc-800 px-3 py-2 text-sm text-white shadow-[0px_0px_1px_1px_var(--neutral-700)] transition duration-400 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-600 disabled:cursor-not-allowed disabled:opacity-50 group-hover/input:shadow-none`,
						className,
					)}
					ref={ref}
					{...props}
				/>
			</motion.div>
			{error && <span className="text-red-500">{error}</span>}
		</>
	);
});
Input.displayName = "Input";

export { Input };
