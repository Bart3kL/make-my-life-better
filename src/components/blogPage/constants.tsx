import { BlogStructure } from "./BlogStructure";

export const createSections = (moveSelectedTabToTop: (idx: number) => void) => [
	{
		title: "Basic informations",
		value: "product",
		content: <BlogStructure moveSelectedTabToTop={moveSelectedTabToTop} />,
	},

	{
		title: "Blog post structure",
		value: "/structure",
		content: <BlogStructure moveSelectedTabToTop={moveSelectedTabToTop} />,
	},

	{
		title: "Content",
		value: "2",
		content: <BlogStructure moveSelectedTabToTop={moveSelectedTabToTop} />,
	},
];
