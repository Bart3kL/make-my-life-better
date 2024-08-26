export type Card = {
	title: string;
	content: string;
	createdat: string;
	link: string;
	src: string;
	headings: string[];
};

export interface ExpandableCardsProps {
	cards: Card[];
}
