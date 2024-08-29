import { type PostProps } from "@/components/shared/Editor/types";

export interface HeadingsStructureProps {
	blogPostId?: string;
}

export type BlogPostData = {
	message?: string;
	blogPost?: PostProps;
};
