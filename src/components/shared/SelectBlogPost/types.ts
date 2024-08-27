export interface SelectBlogPostProps {
	isContentPage?: boolean;
}

export type StructureBlogPosts = {
	blogPosts: {
		id: number;
		title: string;
		createdat: string;
		image: string;
		structure: string;
	}[];
};
