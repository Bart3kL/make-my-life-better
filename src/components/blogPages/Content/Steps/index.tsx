"use client";

import { CountWords } from "./CountWords";
import { StyleSelector } from "./StyleSelector";
import { useStepsReducer } from "./hooks";
import { type StepsProps } from "./types";
import { Editor } from "@/components/shared/Editor";

export const Steps = ({ token, blogPost }: StepsProps) => {
	const { state, handleChange, handleNextStep } = useStepsReducer();

	return (
		<div>
			{state.currentStep === 1 && (
				<CountWords handleChange={handleChange} handleSubmit={handleNextStep} />
			)}
			{state.currentStep === 2 && (
				<StyleSelector
					style={state.style}
					handleChange={handleChange}
					handleSubmit={handleNextStep}
				/>
			)}
			{state.currentStep === 3 && <Editor post={blogPost} token={token} isContentPage {...state} />}
		</div>
	);
};
