import { motion } from "framer-motion";
import Link from "next/link";

export const Logo = () => {
	return (
		<Link
			href="/dashboard"
			className="text-blue-2 relative z-20 flex items-center space-x-2 py-1 text-sm font-normal"
		>
			<div className="bg-blue-2 h-5 w-6 flex-shrink-0 rounded-bl-sm rounded-br-lg rounded-tl-lg rounded-tr-sm" />
			<motion.span
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className="text-blue-2 whitespace-pre font-medium"
			>
				Make Your Life Better
			</motion.span>
		</Link>
	);
};
