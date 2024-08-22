"use client";

import { AnimatedTabs } from "./AnimatedTabs";

import { tabs } from "./constants";

export function TabsContainer() {
	return (
		<div className="b relative mx-auto flex h-full w-full max-w-5xl flex-col items-start justify-start [perspective:1000px]">
			<AnimatedTabs tabs={tabs} />
		</div>
	);
}
