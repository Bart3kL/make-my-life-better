import Link from "next/link";
import { motion } from "framer-motion";

import { SidebarLinkProps } from "./types";
import { useSidebar } from "../hooks";
import { cn } from "@/lib/utils";
import { logout } from "./actions";

export const SidebarLink = ({ link, className, ...props }: SidebarLinkProps) => {
	const { open, animate } = useSidebar();
	return (
		<Link
			href={link.href}
			className={cn("group/sidebar flex items-center justify-start gap-2 py-3", className)}
			{...props}
			onClick={logout}
		>
			{link.icon}

			<motion.span
				animate={{
					display: animate ? (open ? "inline-block" : "none") : "inline-block",
					opacity: animate ? (open ? 1 : 0) : 1,
				}}
				className="text-midnight !m-0 inline-block whitespace-pre !p-0 text-2xl font-semibold transition duration-150 group-hover/sidebar:translate-x-1 md:text-lg"
			>
				{link.label}
			</motion.span>
		</Link>
	);
};
