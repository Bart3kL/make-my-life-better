"use client";

import { Button } from "@mui/material";
import TextareaAutosize from "react-textarea-autosize";
import { FaArrowLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";

import { useFormHandler } from "./hooks";
import { type EditorProps } from "./types";

export const Editor = ({ post, token }: EditorProps) => {
	const { state, dispatch, onSubmitHandler } = useFormHandler({
		post,
		token,
	});
	const router = useRouter();

	return (
		<>
			<form onSubmit={onSubmitHandler} className="h-full">
				<nav className="flex items-center justify-between bg-transparent px-2 py-4 md:px-6">
					<Button color="primary" variant="outlined" onClick={() => router.back()}>
						<FaArrowLeft /> <p className="ml-2">back</p>
					</Button>

					<Button color="primary" type="submit" variant="outlined">
						<p className="ml-2">Submit</p> <FaArrowLeft className="rotate-180" />
					</Button>
				</nav>
				<div className="h-full max-md:px-4">
					<div className="m-auto max-w-[650px]">
						<TextareaAutosize
							value={state.title}
							onChange={(e) =>
								dispatch({ type: "SET_FIELD", field: "title", value: e.target.value })
							}
							aria-label="Post Title"
							placeholder="New post title here..."
							className="text-[rgb(68, 64, 60)] w-full resize-none text-3xl font-bold leading-tight outline-none md:text-4xl md:font-extrabold lg:text-5xl"
							style={{ backgroundColor: "transparent" }}
						/>
					</div>
					<div id="editor" className="prose max-w-full" />
				</div>
			</form>
		</>
	);
};
