import { motion } from "framer-motion";

import { Tab } from "../types";
import { FadeInBoxProps } from "./types";

export const FadeInBox = ({ tabs, hovering }: FadeInBoxProps) => {
	const isActive = (tab: Tab) => {
		return tab.value === tabs[0].value;
	};
	return (
		<div className="relative w-full">
			{tabs.map((tab, idx) => (
				<motion.div
					key={tab.value}
					layoutId={tab.value}
					style={{
						scale: 1 - idx * 0.1,
						top: hovering ? idx * -50 : 0,
						zIndex: -idx,
						opacity: idx < 3 ? 1 - idx * 0.1 : 0,
					}}
					animate={{
						y: isActive(tab) ? [0, 40, 0] : 0,
					}}
					className={"absolute left-0 top-0 mt-32 h-fit w-full"}
				>
					{tab.content}
				</motion.div>
			))}
		</div>
	);
};
