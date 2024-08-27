"use client";

import { BlogPostTitle } from "./BlogPostTitle";

import { AdditionalKnowledge } from "./AdditionalKnowledge";

import { Image } from "./Image";


import { blogTitlePlaceholders, loadingStates } from "./constants";

import { useBlogReducer } from "./hooks";
import { MultiStepLoader as Loader } from "@/components/shared/MultiStepLoader";

export const BasicInformations = () => {
	const {
		state,
		handleChange,
		handleSubmit,
		loading,
		handleFileUpload,
		handleFileDelete,
		handleImageUpload,
		handleImageDelete,
	} = useBlogReducer();

	return (
		<>
			<div className="relative w-full overflow-hidden rounded-2xl border-2 border-paleLavender bg-gradient-to-br from-white to-white-2 p-10 font-bold text-midnight">
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

				{state.step === 3 && (
					<Image
						image={state.image}
						handleImageUpload={handleImageUpload}
						handleImageDelete={handleImageDelete}
						handleSubmit={handleSubmit}
						error={state.errors.imageError}
					/>
				)}
			</div>

			<Loader loadingStates={loadingStates} loading={loading} duration={2000} />
		</>
	);
};
