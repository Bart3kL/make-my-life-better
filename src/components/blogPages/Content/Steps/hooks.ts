import { useReducer } from "react";

import { useRouter } from "next/navigation";
import { stepsReducer, initialState } from "./actions";

import { type UseStepsReducerProps } from "./types";
import { type BlockProps } from "@/components/shared/Editor/types";

export const useStepsReducer = ({ post, token }: UseStepsReducerProps) => {
	const [state, dispatch] = useReducer(stepsReducer, initialState);

	const router = useRouter();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch({
			type: "SET_FIELD",
			field: event.target.id ?? event.target.name,
			value: event.target.value,
		});
	};

	const handleNextStep = () => {
		dispatch({ type: "SET_STEP", payload: state.currentStep + 1 });
	};

	const onSubmitHandler = async () => {
		dispatch({ type: "SET_LOADING", loading: true });

		try {
			const headers = (JSON.parse(post.structure) as { blocks: BlockProps[] }).blocks.filter(
				(block: { type: string }) => block.type === "header",
			);
			const updatedBlocks = await processHeadersSequentially(headers);
			console.log(updatedBlocks);
			const response = await fetch("/api/blog/updatePost", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				cache: "no-cache",
				body: JSON.stringify({
					structure: JSON.stringify({
						time: "1724958128907",
						version: "2.30.5",
						blocks: updatedBlocks,
					}),
					status: "prepared",
					postId: post.id,
				}),
			});

			if (response.ok) {
				router.push(`/blog/post/${post.id}`);
			}
		} catch (error) {
			console.error(error);
		} finally {
			dispatch({ type: "SET_LOADING", loading: false });
		}
	};

	const fetchStreamedData = async (headerObj: {
		id: string;
		data: { text: string };
	}): Promise<BlockProps[]> => {
		const response = await fetch("/api/blog/createContent", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			cache: "no-cache",
			body: JSON.stringify({
				title: post.title,
				header: headerObj.data.text,
				headers: (JSON.parse(post.structure) as { blocks: BlockProps[] }).blocks,
				style: state.style,
				headerLength: state.headerLength,
			}),
		});

		const reader = response.body!.getReader();
		const decoder = new TextDecoder("utf-8");
		let partialContent = "";

		while (true) {
			const { done, value } = await reader.read();
			if (done) break;
			partialContent += decoder.decode(value, { stream: true });
		}

		const newContent: BlockProps = {
			id: `para-${headerObj.id}`,
			type: "paragraph",
			data: { text: partialContent },
		};

		const updatedBlocks = (JSON.parse(post.structure) as { blocks: BlockProps[] }).blocks;
		const headerIndex = updatedBlocks.findIndex((b) => b.id === headerObj.id);
		if (headerIndex !== -1) {
			updatedBlocks.splice(headerIndex + 1, 0, newContent);
		}
		post.structure = JSON.stringify({ ...JSON.parse(post.structure), blocks: updatedBlocks });
		return updatedBlocks;
	};

	const processHeadersSequentially = async (
		headers: { id: string; data: { text: string } }[],
	): Promise<BlockProps[]> => {
		let updatedBlocks: BlockProps[] = (JSON.parse(post.structure) as { blocks: BlockProps[] })
			.blocks;
		for (const header of headers) {
			updatedBlocks = await fetchStreamedData(header);
		}
		return updatedBlocks;
	};

	return {
		handleNextStep,
		state,
		onSubmitHandler,
		handleChange,
	};
};
