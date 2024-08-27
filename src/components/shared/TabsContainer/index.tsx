"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import { type TabsContainerProps } from "./types";
import { cn } from "@/lib/utils";

export function TabsContainer({ sections, currentTab, children }: TabsContainerProps) {
	const tabs = sections;

	const [active, setActive] = useState(tabs[currentTab]);

	function moveSelectedTabToTop(idx: number) {
		setActive(tabs[idx]);
	}

	return (
		<div className="relative mx-auto mb-14 flex h-full w-full max-w-5xl flex-col items-start justify-start [perspective:1000px]">
			<div
				className={cn(
					"no-visible-scrollbar relative flex min-h-32 w-full max-w-full flex-row flex-wrap items-center justify-center overflow-auto [perspective:1000px] sm:mt-5 sm:flex-nowrap sm:overflow-visible",
				)}
			>
				{tabs.map((tab, idx) => {
					const isActiveTab = active.value === tab.value;
					return (
						<Link
							key={tab.title}
							href={tab.value}
							onClick={() => moveSelectedTabToTop(idx)}
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
			{children}
		</div>
	);
}
