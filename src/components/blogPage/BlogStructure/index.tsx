import React from "react";

import { BlogPostTitle } from "./BlogPostTitle";
import { AdditionalKnowledge } from "./AdditionalKnowledge";
import { MultiStepLoader as Loader } from "@/components/shared/MultiStepLoader";

import { blogTitlePlaceholders } from "./constants";
import { useBlogReducer } from "./hooks";

const loadingStates = [
	{
		text: "Buying a condo",
	},
	{
		text: "Travelling in a flight",
	},
	{
		text: "Meeting Tyler Durden",
	},
	{
		text: "He makes soap",
	},
	{
		text: "We goto a bar",
	},
	{
		text: "Start a fight",
	},
	{
		text: "We like it",
	},
	{
		text: "Welcome to F**** C***",
	},
];

export const BlogStructure = ({
	moveSelectedTabToTop,
}: {
	moveSelectedTabToTop: (idx: number) => void;
}) => {
	const { state, handleChange, handleSubmit, loading, handleFileUpload, handleFileDelete } =
		useBlogReducer();

	return (
		<div className="relative mb-56 w-full overflow-hidden rounded-2xl border-2 border-paleLavender bg-gradient-to-br from-white to-white-2 p-10 font-bold text-midnight">
			{state.step === 1 && (
				<BlogPostTitle
					placeholders={blogTitlePlaceholders}
					handleChange={handleChange}
					handleSubmit={handleSubmit}
					error={state.errors.titleBlogPost}
				/>
			)}

			{state.step === 2 && (
				<AdditionalKnowledge
					files={state.files}
					knowledgeText={state.knowledgeText}
					knowledgeUrls={state.knowledgeUrls}
					handleChange={handleChange}
					handleFileUpload={handleFileUpload}
					handleFileDelete={handleFileDelete}
					handleSubmit={handleSubmit}
					error={state.errors.knowledgeError}
				/>
			)}

			<Loader loadingStates={loadingStates} loading={loading} duration={2000} />
		</div>
	);
};
