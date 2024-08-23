"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { FadeInBox } from "@/components/blogPage/FadeInBox";
import { createSections } from "./constants";
import Link from "next/link";

export function TabsContainer() {
	const tabs = createSections(moveSelectedTabToTop);

	const [active, setActive] = useState(tabs[0]);
	const [hovering, setHovering] = useState(false);

	function moveSelectedTabToTop(idx: number) {
		setActive(tabs[idx]);
	}

	return (
		<div className="relative mx-auto flex h-full w-full max-w-5xl flex-col items-start justify-start [perspective:1000px]">
			<div
				className={cn(
					"no-visible-scrollbar relative flex min-h-28 w-full max-w-full flex-row flex-wrap items-center justify-center overflow-auto [perspective:1000px] sm:mt-5 sm:flex-nowrap sm:overflow-visible",
				)}
			>
				{tabs.map((tab, idx) => {
					const isActiveTab = active.value === tab.value;
					return (
						<Link
							key={tab.title}
							href={tab.value}
							onMouseEnter={() => setHovering(true)}
							onMouseLeave={() => setHovering(false)}
							className={"relative rounded-full px-4 py-2"}
							style={{
								transformStyle: "preserve-3d",
							}}
						>
							{isActiveTab && (
								<motion.div
									layoutId="clickedbutton"
									transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
									className={"absolute inset-0 rounded-full bg-blue-2"}
								/>
							)}

							<span className={cn("relative block text-midnight", isActiveTab && "text-white")}>
								{tab.title}
							</span>
						</Link>
					);
				})}
			</div>
			<FadeInBox tabs={tabs} active={active} key={active.value} hovering={hovering} />
		</div>
	);
}
