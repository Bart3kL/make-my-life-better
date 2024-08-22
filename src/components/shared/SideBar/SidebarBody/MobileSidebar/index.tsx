import { AnimatePresence, motion } from "framer-motion";
import { IoMenuOutline, IoClose } from "react-icons/io5";

import { useSidebar } from "../hooks";
import { cn } from "@/lib/utils";

export const MobileSidebar = ({ className, children, ...props }: React.ComponentProps<"div">) => {
	const { open, setOpen } = useSidebar();
	return (
		<>
			<div
				className={cn(
					"bg-white-2 border-paleLavender r flex h-12 w-full flex-row items-center justify-between border-b-2 px-4 py-4 md:hidden",
				)}
				{...props}
			>
				<div className="z-20 flex w-full justify-end">
					<IoMenuOutline className="text-midnight h-10 w-10" onClick={() => setOpen(!open)} />
				</div>
				<AnimatePresence>
					{open && (
						<motion.div
							initial={{ x: "-100%", opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							exit={{ x: "-100%", opacity: 0 }}
							transition={{
								duration: 0.3,
								ease: "easeInOut",
							}}
							className={cn(
								"bg-white-2 border-paleLavende fixed inset-0 z-[100] flex h-full w-full flex-col justify-between border-r-2 p-10",
								className,
							)}
						>
							<div
								className="text-midnight absolute right-10 top-10 z-50"
								onClick={() => setOpen(!open)}
							>
								<IoClose className="text-midnight h-10 w-10" />
							</div>
							{children}
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</>
	);
};
