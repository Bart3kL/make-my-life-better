export type Card = {
	title: string;
	createdat: string;
	link: string;
	src: string;
	headings: string[] | { blocks: { data: { text: string } }[] };
};

export interface ExpandableCardsProps {
	cards: Card[];
	isContentPage?: boolean;
}
