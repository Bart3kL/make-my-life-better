import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Skeleton from "@mui/material/Skeleton";

import { SidebarLinkProps } from "./types";
import { useSidebar } from "../hooks";
import { cn } from "@/lib/utils";
import { logout } from "./actions";

export const SidebarLink = ({
	link,
	className,
	loading = false,
	...props
}: SidebarLinkProps & { loading?: boolean }) => {
	const { open, animate } = useSidebar();
	const pathname = usePathname();

	const isActive = link.activeLink!.includes(pathname);
	const activeClassName = isActive ? "text-blue-500" : "text-midnight";

	return (
		<Link
			href={link.href}
			className={cn(
				"group/sidebar flex items-center justify-start gap-2 py-3",
				className,
				activeClassName,
			)}
			{...props}
			onClick={() => (link.label === "Logout" ? logout() : null)}
		>
			{loading ? (
				<>
					<Skeleton variant="circular" width={24} height={24} />
				</>
			) : (
				<>
					{link.icon}
					<motion.span
						animate={{
							display: animate ? (open ? "inline-block" : "none") : "inline-block",
							opacity: animate ? (open ? 1 : 0) : 1,
						}}
						className={cn(
							"!m-0 inline-block overflow-hidden whitespace-pre !p-0 text-2xl font-semibold text-midnight transition duration-150 group-hover/sidebar:translate-x-1 md:text-lg",
							activeClassName,
						)}
					>
						{link.label}
					</motion.span>
				</>
			)}
		</Link>
	);
};
