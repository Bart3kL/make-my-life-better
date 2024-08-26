import { cookies } from "next/headers";

import { Steps } from "./Steps";
import { SelectBlogPost } from "../../shared/SelectBlogPost";

import { HeadingsStructureProps } from "./types";

export const Content = async ({ blogPostId }: HeadingsStructureProps) => {
	const token = cookies().get("auth-token")!.value;

	let data;

	if (blogPostId) {
		const url = process.env.BASE_URL || "http://localhost:3000";
		const response = await fetch(
			`${url}/api/blog/getBlogPost?blogPostId=${blogPostId}&status=draft`,
			{
				method: "GET",
				cache: "no-store",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		data = await response.json();
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
