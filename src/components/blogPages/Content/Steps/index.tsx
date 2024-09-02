"use client";

import { CountWords } from "./CountWords";
import { StyleSelector } from "./StyleSelector";
import { useStepsReducer } from "./hooks";
import { type StepsProps } from "./types";
import { type BlockProps } from "@/components/shared/Editor/types";

import { MultiStepLoader as Loader } from "@/components/shared/MultiStepLoader";

export const Steps = ({ token, blogPost }: StepsProps) => {
	const { state, handleChange, handleNextStep, onSubmitHandler } = useStepsReducer({
		post: blogPost,
		token,
	});

	return (
		<div>
			{state.currentStep === 1 && (
				<CountWords handleChange={handleChange} handleSubmit={handleNextStep} />
			)}
			{state.currentStep === 2 && (
				<StyleSelector
					style={state.style}
					handleChange={handleChange}
					onSubmitHandler={onSubmitHandler}
				/>
			)}

			<Loader
				loadingStates={(JSON.parse(blogPost.structure) as { blocks: BlockProps[] }).blocks.map(
					(b) => ({
						text: b.data.text,
					}),
				)}
				loading={state.loading}
				duration={2000}
			/>
		</div>
	);
};
