export type CardProps = CardType & {
	idx: number;
	hoveredIndex: number | null;
	setHoveredIndex: (idx: number | null) => void;
};

export interface CardType {
	id: number;
	title: string;
	createdat: string;
	image: string;
	structure: string;
	status: string;
}
