import { cookies } from "next/headers";
import Link from "next/link";

import { ExpandableCards } from "@/components/shared/ExpandableCards";

export const SelectBlogPost = async () => {
	const url = process.env.BASE_URL || "http://localhost:3000";
	const response = await fetch(`${url}/api/blog/getAllBlogPosts`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${cookies().get("auth-token")!.value}`,
		},
		body: JSON.stringify({ status: "onlyStructure", fields: "id,title,createdat,structure,image" }),
	});

	const { blogPosts } = await response.json();

	const noBlogPosts = !blogPosts;

	return (
		<>
			<h2 className="mb-10 text-center text-xl text-midnight md:mb-20 md:text-3xl">
				{noBlogPosts ? "No blog posts found with heading structure" : "Select blog post structure"}
			</h2>
			<div className="mx-auto w-full max-w-xl">
				{noBlogPosts ? (
					<div className="mx-auto flex w-full max-w-72 flex-col justify-items-center text-center">
						<Link
							type="submit"
							className="mt-6 rounded-md bg-midnight px-8 py-3 text-white"
							href="/dashboard/blog"
						>
							Create your first blog post
						</Link>
					</div>
				) : (
					<ExpandableCards
						cards={blogPosts.map(({ id, title, createdat, image, structure }: any) => ({
							title: title,
							createdat: createdat.split("T")[0],
							src: image,
							link: "/dashboard/blog/structure?blogPostId=" + id,
							headings: JSON.parse(structure),
						}))}
					/>
				)}
			</div>
		</>
	);
};
