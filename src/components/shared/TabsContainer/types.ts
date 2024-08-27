export type Tab = {
	title: string;
	value: string;
	content?: string | React.ReactNode;
};

export interface TabsContainerProps {
	sections: Tab[];
	currentTab: number;
	children?: React.ReactNode;
}
