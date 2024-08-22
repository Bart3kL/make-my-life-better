import { Tab } from "../types";

export interface FadeInBoxProps {
	className?: string;
	key?: string;
	tabs: Tab[];
	active: Tab;
	hovering?: boolean;
}
