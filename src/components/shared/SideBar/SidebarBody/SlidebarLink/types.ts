import { LinkProps } from "next/link";

type Links = {
	label: string;
	href: string;
	activeLink?: string[];
	icon: React.JSX.Element | React.ReactNode;
};

export interface SidebarLinkProps {
	link: Links;
	className?: string;
	props?: LinkProps;
}
