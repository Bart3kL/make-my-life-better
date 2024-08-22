import { motion } from "framer-motion";

import { useSidebar } from "../hooks";
import { cn } from "@/lib/utils";

export const DesktopSidebar = ({
	className,
	children,
	...props
}: React.ComponentProps<typeof motion.div>) => {
	const { open, setOpen, animate } = useSidebar();
	return (
		<>
			<motion.div
				className={cn(
					"hidden h-full w-[300px] flex-shrink-0 bg-white px-4 py-4 md:flex md:flex-col",
					className,
				)}
				animate={{
					width: animate ? (open ? "300px" : "60px") : "300px",
				}}
				onMouseEnter={() => setOpen(true)}
				onMouseLeave={() => setOpen(false)}
				{...props}
			>
				{children}
			</motion.div>
		</>
	);
};
