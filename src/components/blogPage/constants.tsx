import { BlogStructure } from "./BlogStructure";

export const createSections = (moveSelectedTabToTop: (idx: number) => void) => [
	{
		title: "Basic informations",
		value: "product",
		content: <BlogStructure moveSelectedTabToTop={moveSelectedTabToTop} />,
	},

	{
		title: "Structure",
		value: "1",
		content: <BlogStructure moveSelectedTabToTop={moveSelectedTabToTop} />,
	},

	{
		title: "Content",
		value: "2",
		content: <BlogStructure moveSelectedTabToTop={moveSelectedTabToTop} />,
	},
];
