import { TabPanel, TextareaAutosize } from "@mui/base";

import { type TextareaProps } from "./types";

export const Textarea = ({ value, placeholder, id, onChange, valueInput }: TextareaProps) => {
	return (
		<TabPanel value={value}>
			<div className="mx-auto flex w-full max-w-xl flex-col justify-items-center">
				<TextareaAutosize
					className="w-full resize-none rounded-md border-2 border-paleLavender bg-white px-8 py-3 text-midnight"
					aria-label="empty textarea"
					placeholder={placeholder}
					id={id}
					value={valueInput}
					minRows={12}
					maxRows={30}
					onChange={onChange}
				/>
			</div>
		</TabPanel>
	);
};
