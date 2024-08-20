"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ShootingStars } from "./ShootingStars";
import { StarsBackground } from "./StarsBackground";

export function ShootingStarsAndStarsBackgroundDemo({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth < 640);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const getMotionDivProps = (mobileWidth: string, desktopWidth: string) => ({
		initial: { opacity: 0.5, width: mobileWidth },
		whileInView: { opacity: 1, width: desktopWidth },
		transition: {
			delay: 0.3,
			duration: 0.8,
			ease: "easeInOut",
		},
	});

	return (
		<div className="relative flex h-full min-h-screen w-full flex-col items-center justify-center overflow-auto rounded-md">
			<div
				className={cn(
					"relative z-0 flex min-h-80 w-full flex-col items-center justify-center overflow-hidden rounded-md bg-slate-950",
					className,
				)}
			>
				<ShootingStars />
				<StarsBackground />
				<div className="relative isolate z-0 mt-44 flex w-full flex-1 scale-y-125 items-center justify-center">
					<motion.div
						{...getMotionDivProps(isMobile ? "7.5rem" : "15rem", isMobile ? "15rem" : "30rem")}
						style={{
							backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
						}}
						className="absolute inset-auto right-1/2 h-56 w-[30rem] overflow-visible bg-gradient-conic from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
					>
						<div className="absolute bottom-0 left-0 z-20 h-40 w-[100%] bg-slate-950 [mask-image:linear-gradient(to_top,white,transparent)]" />
						<div className="absolute bottom-0 left-0 z-20 h-[100%] w-40 bg-slate-950 [mask-image:linear-gradient(to_right,white,transparent)]" />
					</motion.div>
					<motion.div
						{...getMotionDivProps(isMobile ? "7.5rem" : "15rem", isMobile ? "15rem" : "30rem")}
						style={{
							backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
						}}
						className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-cyan-500 text-white [--conic-position:from_290deg_at_center_top]"
					>
						<div className="absolute bottom-0 right-0 z-20 h-[100%] w-40 bg-slate-950 [mask-image:linear-gradient(to_left,white,transparent)]" />
						<div className="absolute bottom-0 right-0 z-20 h-40 w-[100%] bg-slate-950 [mask-image:linear-gradient(to_top,white,transparent)]" />
					</motion.div>
					<div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-slate-950 blur-2xl"></div>
					<div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
					<div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-cyan-500 opacity-50 blur-3xl"></div>
					<motion.div
						initial={{ width: isMobile ? "4rem" : "8rem" }}
						whileInView={{ width: isMobile ? "8rem" : "16rem" }}
						transition={{
							delay: 0.3,
							duration: 0.8,
							ease: "easeInOut",
						}}
						className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-cyan-400 blur-2xl"
					></motion.div>
					<motion.div
						initial={{ width: isMobile ? "7.5rem" : "15rem" }}
						whileInView={{ width: isMobile ? "15rem" : "30rem" }}
						transition={{
							delay: 0.3,
							duration: 0.8,
							ease: "easeInOut",
						}}
						className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-cyan-400"
					></motion.div>

					<div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-slate-950"></div>
				</div>

				<div className="relative z-50 flex -translate-y-80 flex-col items-center px-5">
					{children}
				</div>
			</div>
		</div>
	);
}
