import { type BlogPostTitleProps } from "./types";

import { PlaceholdersAndVanishInput } from "@/components/shared/AnimatedInput";

export const BlogPostTitle = ({
	placeholders,
	handleChange,
	handleSubmit,
	error,
}: BlogPostTitleProps) => {
	return (
		<>
			<h2 className="mb-10 text-center text-xl text-midnight md:mb-20 md:text-3xl">
				Enter blog post title
			</h2>
			<div className="mx-auto w-full max-w-xl">
				<PlaceholdersAndVanishInput
					placeholders={placeholders}
					onChange={handleChange}
					id="titleBlogPost"
					onSubmit={handleSubmit}
				/>
				{error && <p className="mt-2 text-red-500">{error}</p>}
			</div>
		</>
	);
};
