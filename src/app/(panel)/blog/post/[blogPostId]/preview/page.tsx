import { redirect } from "next/navigation";

import { Preview } from "@/components/blogPages/BlogPost/Preview";

import { type BlogPostData } from "@/components/blogPages/Structure/types";
import { useFetch } from "@/hooks/useFetch";

interface SearchParams {
	blogPostId: string;
}

export default async function PreviewBlogPost({ params }: { params: SearchParams }) {
	const response = await useFetch<BlogPostData>({
		endpoint: `/blog/getBlogPost?blogPostId=${params.blogPostId}&status=prepared`,
		method: "GET",
		requestBody: "",
	});

	if (!response.blogPost) {
		redirect("/dashboard");
	}

	return (
		<>
			<Preview {...response.blogPost} />
		</>
	);
}
