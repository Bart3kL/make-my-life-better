export interface GenerateBlogPostStructureProps {
	titleBlogPost: string;
	processedData: {
		files?: string[];
		text?: string;
		urlsContent?: string[];
	};
}
