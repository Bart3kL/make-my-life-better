import Link from "next/link";

import { type StructureBlogPosts, type SelectBlogPostProps } from "./types";
import { ExpandableCards } from "@/components/shared/ExpandableCards";

import { useFetch } from "@/hooks/useFetch";

export const SelectBlogPost = async ({ isContentPage }: SelectBlogPostProps) => {
	const data = await useFetch<StructureBlogPosts>({
		endpoint: "/blog/getAllBlogPosts",
		method: "POST",
		requestBody: JSON.stringify({
			status: isContentPage ? "draft" : "onlyStructure",
			fields: "id,title,createdat,structure,image",
		}),
	});

	const noBlogPosts = !data.blogPosts;

	return (
		<>
			<h2 className="mb-10 overflow-auto text-center text-xl text-midnight md:mb-20 md:text-3xl">
				{noBlogPosts ? "No blog posts found with heading structure" : "Select blog post structure"}
			</h2>
			<div className="mx-auto w-full max-w-xl">
				{noBlogPosts ? (
					<div className="mx-auto flex w-full max-w-72 flex-col justify-items-center text-center">
						<Link
							type="submit"
							className="mt-6 rounded-md bg-midnight px-8 py-3 text-white"
							href="/blog"
						>
							Create your first blog post
						</Link>
					</div>
				) : (
					<ExpandableCards
						isContentPage={isContentPage}
						cards={data.blogPosts.map(({ id, title, createdat, image, structure }) => ({
							title: title,
							createdat: createdat.split("T")[0],
							src: image,
							link: `/blog/${isContentPage ? "content" : "structure"}?blogPostId=` + id,

							headings: JSON.parse(structure) as
								| string[]
								| { blocks: { data: { text: string } }[] },
						}))}
					/>
				)}
			</div>
		</>
	);
};
