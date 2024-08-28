import { cookies } from "next/headers";

import { SelectBlogPost } from "../../shared/SelectBlogPost";
import { type BlogPostData } from "../HeadingsStructure/types";
import { Steps } from "./Steps";

import { type HeadingsStructureProps } from "./types";
import { useFetch } from "@/hooks/useFetch";

export const Content = async ({ blogPostId }: HeadingsStructureProps) => {
	const token = cookies().get("auth-token")!.value;

	let data: BlogPostData = {};

	if (blogPostId) {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const response = await useFetch<BlogPostData>({
			endpoint: `/blog/getBlogPost?blogPostId=${blogPostId}&status=draft`,
			method: "GET",
			requestBody: "",
		});
		data = response;
	}

	return (
		<>
			<div className="relative mt-16 w-full overflow-auto rounded-2xl border-2 border-paleLavender bg-gradient-to-br from-white to-white-2 p-10 font-bold text-midnight">
				{(!blogPostId || data.message) && !data?.blogPost && <SelectBlogPost isContentPage />}
				{data?.blogPost && <Steps blogPost={data.blogPost} token={token} />}
			</div>
		</>
	);
};
