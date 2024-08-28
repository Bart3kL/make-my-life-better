import { Tabs } from "@mui/base/Tabs";
import { TabsList as BaseTabsList } from "@mui/base/TabsList";

import { FileUploadContainer } from "../../../shared/FileUploadContainer";
import { Tab } from "../../../shared/Tab";
import { Textarea } from "../../../shared/Textarea";

import { type AdditionalKnowledgeProps } from "./types";

export const AdditionalKnowledge = ({
	files,
	knowledgeText,
	knowledgeUrls,
	handleFileUpload,
	handleFileDelete,
	handleSubmit,
	handleChange,
	error,
}: AdditionalKnowledgeProps) => {
	return (
		<>
			<h2 className="text-center text-xl text-midnight md:text-3xl">Additional knowledge</h2>
			<Tabs defaultValue={0}>
				<BaseTabsList
					className={
						"mb2 ml-auto mr-auto mt-10 flex max-w-80 content-between items-center justify-center rounded-xl font-sans"
					}
				>
					<Tab value={0}>File upload</Tab>
					<Tab value={1}>Text</Tab>
					<Tab value={2}>URLs</Tab>
				</BaseTabsList>
				<FileUploadContainer {...{ files, handleFileUpload, handleFileDelete }} />
				<Textarea
					value={1}
					placeholder="Enter your knowledge here"
					id="knowledgeText"
					onChange={handleChange}
					valueInput={knowledgeText}
				/>
				<Textarea
					value={2}
					placeholder="Enter URLs after comma: https://example.com,https://example.com/2"
					id="knowledgeUrls"
					onChange={handleChange}
					valueInput={knowledgeUrls}
				/>
			</Tabs>
			<div className="mx-auto flex w-full max-w-xl flex-col justify-items-center">
				{error && <p className="text-center text-red-500">{error}</p>}
				<button
					type="submit"
					className="mt-6 rounded-md bg-midnight px-8 py-3 text-white"
					onClick={handleSubmit}
				>
					Submit
				</button>
			</div>
		</>
	);
};
