export interface SelectBlogPostProps {
	isContentPage?: boolean;
	text: string;
}

export type StructureBlogPosts = {
	blogPosts: {
		id: number;
		title: string;
		createdat: string;
		image: string;
		structure: string;
		status: string;
	}[];
};
