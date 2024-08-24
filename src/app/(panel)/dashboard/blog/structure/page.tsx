import { cookies } from "next/headers";

import { Editor } from "@/components/shared/Editor";

export default async function StrucutePage({ searchParams }: { searchParams: any }) {
	const url = process.env.BASE_URL || "http://localhost:3000";
	const response = await fetch(
		`${url}/api/blog/getBlogPost?blogPostId=${searchParams.blogPostId}`,
		{
			method: "GET",
			headers: {
				Authorization: `Bearer ${cookies().get("auth-token")!.value}`,
			},
		},
	);
	const data = await response.json();

	return (
		<div
			style={{
				position: "fixed",
				inset: 0,
				width: "100%",
				height: "100%",
				backgroundColor: "background",
			}}
		>
			{data && <Editor post={data.blogPost} />}
		</div>
	);
}
