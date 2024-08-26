import { cookies } from "next/headers";

import { Editor } from "@/components/shared/Editor";
import { SelectBlogPost } from "./SelectBlogPost";

import { HeadingsStructureProps } from "./types";

export const HeadingsStructure = async ({ blogPostId }: HeadingsStructureProps) => {
	const token = cookies().get("auth-token")!.value;

	const url = process.env.BASE_URL || "http://localhost:3000";
	const response = await fetch(
		`${url}/api/blog/getBlogPost?blogPostId=${blogPostId}&status=onlyStructure`,
		{
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	);
	const data = await response.json();

	return (
		<>
			<div className="relative mb-56 w-full overflow-hidden rounded-2xl border-2 border-paleLavender bg-gradient-to-br from-white to-white-2 p-10 font-bold text-midnight">
				{(!blogPostId || data.message) && !data.blogPost && <SelectBlogPost />}
				{data.blogPost && <Editor post={data.blogPost} token={token} />}
			</div>
		</>
	);
};
