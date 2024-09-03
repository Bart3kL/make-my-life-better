import { cookies } from "next/headers";

import { type BlogPostData, type HeadingsStructureProps } from "./types";
import { Editor } from "@/components/shared/Editor";
import { SelectBlogPost } from "@/components/shared/SelectBlogPost";

import { useFetch } from "@/hooks/useFetch";

export const HeadingsStructure = async ({ blogPostId }: HeadingsStructureProps) => {
	const token = cookies().get("auth-token")!.value;

	let data: BlogPostData = {};

	if (blogPostId) {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const response = await useFetch<BlogPostData>({
			endpoint: `/blog/getBlogPost?blogPostId=${blogPostId}&status=onlyStructure`,
			method: "GET",
			requestBody: "",
		});
		data = response;
	}

	return (
		<>
			<div className="relative mt-5 w-full overflow-auto rounded-2xl border-2 border-paleLavender bg-gradient-to-br from-white to-white-2 p-10 font-bold text-midnight">
				{(!blogPostId || data.message) && !data?.blogPost && (
					<SelectBlogPost text="No blog posts found with heading structure" />
				)}
				{data?.blogPost && <Editor post={data.blogPost} token={token} />}
			</div>
		</>
	);
};
