import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { Editor } from "@/components/blogPages/BlogPost/Editor";

import { type BlogPostData } from "@/components/blogPages/Structure/types";
import { useFetch } from "@/hooks/useFetch";

interface SearchParams {
	blogPostId: string;
}

export default async function ReadyBlogPost({ params }: { params: SearchParams }) {
	const response = await useFetch<BlogPostData>({
		endpoint: `/blog/getBlogPost?blogPostId=${params.blogPostId}&status=prepared`,
		method: "GET",
		requestBody: "",
	});

	if (!response.blogPost) {
		redirect("/dashboard");
	}

	return <Editor post={response.blogPost} token={cookies().get("auth-token")!.value} />;
}
