"use client";

import { useState } from "react";

import { sections } from "./constants";
import { Tab } from "./types";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FadeInBox } from "@/components/blogPage/FadeInBox";

export function TabsContainer() {
	const [active, setActive] = useState<Tab>(sections[0]);
	const [tabs, setTabs] = useState<Tab[]>(sections);

	const moveSelectedTabToTop = (idx: number) => {
		const newTabs = [...tabs];
		const selectedTab = newTabs.splice(idx, 1);
		newTabs.unshift(selectedTab[0]);
		setTabs(newTabs);
		setActive(newTabs[0]);
	};

	const [hovering, setHovering] = useState(false);

	return (
		<div className="b relative mx-auto flex h-full w-full max-w-5xl flex-col items-start justify-start [perspective:1000px]">
			<div
				className={cn(
					"no-visible-scrollbar relative flex min-h-28 w-full max-w-full flex-row flex-wrap items-center justify-center overflow-auto [perspective:1000px] sm:mt-5 sm:flex-nowrap sm:overflow-visible",
				)}
			>
				{sections.map((tab, idx) => {
					const isActiveTab = active.value === tab.value;
					return (
						<button
							key={tab.title}
							onClick={() => {
								moveSelectedTabToTop(idx);
							}}
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
						</button>
					);
				})}
			</div>
			<FadeInBox tabs={tabs} active={active} key={active.value} hovering={hovering} />
		</div>
	);
}
