import { motion } from "framer-motion";

import { ButtonProps } from "./types";

export const Button = ({ value, handleSubmit }: ButtonProps) => {
	return (
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
	);
};
