"use client";
import Image from "next/image";
import { Button } from "@mui/material";
import TextareaAutosize from "react-textarea-autosize";

import { useFormHandler } from "./hooks";
import { type BlockProps, type EditorProps } from "./types";
import { MultiStepLoader as Loader } from "@/components/shared/MultiStepLoader";

export const Editor = ({ post, token }: EditorProps) => {
	const { state, onTitleChangeHandler, onSubmitHandler } = useFormHandler({
		post,
		token,
	});
	const isChanged = state.isContentChanged || state.isTitleChanged;
	return (
		<>
			<form onSubmit={onSubmitHandler} className="h-full">
				<nav className="mb-12 flex items-center justify-between bg-transparent px-2 py-4 md:px-6">
					{isChanged ? (
						<Button color="primary" type="submit" variant="outlined">
							<p className="ml-2">Save (not saved)</p>
						</Button>
					) : (
						<p />
					)}
					<Button
						color="primary"
						type="submit"
						variant="outlined"
						href={`/blog/post/${post.id}/preview`}
					>
						<p className="ml-2">Preview</p>
					</Button>
				</nav>
				<div className="h-full max-md:px-4">
					<div className="m-auto max-w-[850px]">
						<Image
							className="mb-9"
							src={post.image}
							width={400}
							height={200}
							style={{
								width: "100%",
								height: "100%",
								objectFit: "cover",
								maxHeight: "350px",
								borderRadius: "10px",
							}}
							alt={post.title}
						/>
						<TextareaAutosize
							value={state.title}
							onChange={onTitleChangeHandler}
							aria-label="Post Title"
							placeholder="New post title here..."
							className="text-[rgb(68, 64, 60)] w-full resize-none text-3xl font-bold leading-tight outline-none md:text-4xl md:font-extrabold lg:text-5xl"
							style={{ backgroundColor: "transparent" }}
						/>
					</div>
					<div id="editor" className="prose max-w-full" />
				</div>
			</form>

			<Loader
				loadingStates={(JSON.parse(post.structure) as { blocks: BlockProps[] }).blocks.map((b) => ({
					text: b.data.text,
				}))}
				loading={state.loading}
				duration={2000}
			/>
		</>
	);
};
