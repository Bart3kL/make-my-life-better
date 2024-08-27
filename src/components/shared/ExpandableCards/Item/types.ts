import { type Card } from "../types";

export interface ItemProps {
	setActive: (card: Card) => void;
	card: Card;
	id: string;
	isContentPage?: boolean;
}
