"use client";

import { useState } from "react";

import { Card } from "./Card";

import { type BlogPostCardsProps } from "@/components/dashboardPage/BlogPostCard/types";

export const BlogPosts = ({ posts }: BlogPostCardsProps) => {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	return (
		<div className={"grid w-full grid-cols-1 py-10 md:grid-cols-2 lg:grid-cols-4"}>
			{posts.map((item, idx) => (
				<Card
					key={idx}
					idx={idx}
					{...item}
					setHoveredIndex={setHoveredIndex}
					hoveredIndex={hoveredIndex}
				/>
			))}
		</div>
	);
};
