import { cookies } from "next/headers";

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
	console.log(await response.json());
	return <></>;
}
