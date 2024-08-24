import { TabsContainer } from "@/components/shared/TabsContainer";
export type Tab = {
	title: string;
	value: string;
	content?: string | React.ReactNode | any;
};

export interface AnimatedTabsProps {
	tabs: Tab[];
	containerClassName?: string;
	activeTabClassName?: string;
	tabClassName?: string;
	contentClassName?: string;
}

export interface TabsContainerProps {
	sections: Tab[];
	currentTab: number;
}
