import { MeteorCard } from "@/components/dashboardPage/BlogPostCard";
import { type StructureBlogPosts } from "@/components/shared/SelectBlogPost/types";
import { useFetch } from "@/hooks/useFetch";

export default async function DashboardPage() {
	const data = await useFetch<StructureBlogPosts>({
		endpoint: "/blog/getAllBlogPosts",
		method: "POST",
		requestBody: JSON.stringify({
			status: "prepared",
			fields: "id,title,createdat,image",
		}),
	});
	console.log(data);
	return (
		<div className="flex h-full flex-wrap items-center justify-center gap-10">
			{data.blogPosts.map((blog) => (
				<MeteorCard
					title={blog.title}
					image={blog.image}
					key={blog.id.toString()}
					id={blog.id.toString()}
				/>
			))}
		</div>
	);
}
