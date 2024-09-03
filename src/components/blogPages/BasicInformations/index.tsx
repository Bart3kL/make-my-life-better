"use client";

import { BlogPostTitle } from "./BlogPostTitle";
import { AdditionalKnowledge } from "./AdditionalKnowledge";
import { Image } from "./Image";

import { blogTitlePlaceholders, loadingStates } from "./constants";

import { useBlogReducer } from "./hooks";
import { type BasicInformationsProps } from "./types";
import { MultiStepLoader as Loader } from "@/components/shared/MultiStepLoader";

export const BasicInformations = ({ token }: BasicInformationsProps) => {
	const {
		state,
		handleChange,
		handleSubmit,
		loading,
		handleFileUpload,
		handleFileDelete,
		handleImageUpload,
		handleImageDelete,
	} = useBlogReducer({ token });

	return (
		<>
			<div className="relative mt-5 w-full overflow-hidden rounded-2xl border-2 border-paleLavender bg-gradient-to-br from-white to-white-2 p-10 font-bold text-midnight">
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
					// eslint-disable-next-line jsx-a11y/alt-text
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
