"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { FadeInBox } from "./FadeInBox";

import { AnimatedTabsProps, Tab } from "./types";
import { cn } from "@/lib/utils";

export const AnimatedTabs = ({
	tabs: propTabs,
	containerClassName,
	activeTabClassName,
	tabClassName,
	contentClassName,
}: AnimatedTabsProps) => {
	const [active, setActive] = useState<Tab>(propTabs[0]);
	const [tabs, setTabs] = useState<Tab[]>(propTabs);

	const moveSelectedTabToTop = (idx: number) => {
		const newTabs = [...propTabs];
		const selectedTab = newTabs.splice(idx, 1);
		newTabs.unshift(selectedTab[0]);
		setTabs(newTabs);
		setActive(newTabs[0]);
	};

	const [hovering, setHovering] = useState(false);

	return (
		<>
			<div
				className={cn(
					"no-visible-scrollbar relative flex min-h-28 w-full max-w-full flex-row flex-wrap items-center justify-center overflow-auto [perspective:1000px] sm:mt-5 sm:flex-nowrap sm:overflow-visible",
					containerClassName,
				)}
			>
				{propTabs.map((tab, idx) => {
					const isActiveTab = active.value === tab.value;
					return (
						<button
							key={tab.title}
							onClick={() => {
								moveSelectedTabToTop(idx);
							}}
							onMouseEnter={() => setHovering(true)}
							onMouseLeave={() => setHovering(false)}
							className={cn("relative rounded-full px-4 py-2", tabClassName)}
							style={{
								transformStyle: "preserve-3d",
							}}
						>
							{isActiveTab && (
								<motion.div
									layoutId="clickedbutton"
									transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
									className={cn("absolute inset-0 rounded-full bg-blue-2", activeTabClassName)}
								/>
							)}

							<span className={cn("relative block text-midnight", isActiveTab && "text-white")}>
								{tab.title}
							</span>
						</button>
					);
				})}
			</div>
			<FadeInBox
				tabs={tabs}
				active={active}
				key={active.value}
				hovering={hovering}
				className={contentClassName}
			/>
		</>
	);
};
