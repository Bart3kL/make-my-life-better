export type Card = {
	title: string;
	content: string;
	createdat: string;
	link: string;
	src: string;
	headings: any;
};

export interface ExpandableCardsProps {
	cards: Card[];
	isContentPage?: boolean;
}
