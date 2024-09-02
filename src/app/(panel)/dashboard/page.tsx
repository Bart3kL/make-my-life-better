import Link from "next/link";
import { BlogPosts } from "@/components/dashboardPage/BlogPostCard";
import { useFetch } from "@/hooks/useFetch";
import { type StructureBlogPosts } from "@/components/shared/SelectBlogPost/types";
import { BackgroundBeamsWithCollision } from "@/components/dashboardPage/BackgroundBeamsWithCollision";

export default async function DashboardPage() {
	const data = await useFetch<StructureBlogPosts>({
		endpoint: "/blog/getAllBlogPosts",
		method: "POST",
		requestBody: JSON.stringify({
			status: "prepared",
			fields: "id,title,createdat,image,status",
		}),
	});

	return (
		<div className="flex items-center justify-center gap-10">
			{data.blogPosts ? (
				<BlogPosts posts={data.blogPosts} />
			) : (
				<BackgroundBeamsWithCollision>
					<h2 className="relative z-20 w-full text-center font-sans text-2xl font-bold tracking-tight text-midnight md:text-4xl lg:text-5xl">
						No ready-made blog post with headlines and content found.{" "}
						<div className="relative mx-auto flex w-max flex-col [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
							<div className="absolute left-0 top-[1px] bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text bg-no-repeat py-4 text-transparent [text-shadow:0_0_rgba(0,0,0,0.1)]">
								<Link href="/blog" className="border-b-2">
									Add blog post
								</Link>
							</div>
							<div className="relative bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text bg-no-repeat py-4 text-transparent">
								<Link href="/blog" className="border-b-2">
									Add blog post
								</Link>
							</div>
						</div>
					</h2>
				</BackgroundBeamsWithCollision>
			)}
		</div>
	);
}
