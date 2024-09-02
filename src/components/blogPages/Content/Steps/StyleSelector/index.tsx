import { FormControl, MenuItem, Select } from "@mui/material";

import { type StyleSelectorProps } from "./types";

export const StyleSelector = ({ style, handleChange, onSubmitHandler }: StyleSelectorProps) => {
	return (
		<div className="mx-auto w-full max-w-xl">
			<h2 className="mb-10 text-center text-xl text-midnight md:mb-20 md:text-3xl">
				Choose your writing style
			</h2>
			<FormControl fullWidth>
				<Select
					labelId="style-select-label"
					value={style}
					onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
					name="style"
				>
					<MenuItem value="formal" id="style">
						Formal
					</MenuItem>
					<MenuItem value="informal" id="style">
						Informal
					</MenuItem>
					<MenuItem value="technical" id="style">
						Technical
					</MenuItem>
					<MenuItem value="literary" id="style">
						Literary
					</MenuItem>
				</Select>
			</FormControl>
			<div className="mx-auto flex w-full max-w-xl flex-col justify-items-center">
				<button
					type="submit"
					className="mt-6 rounded-md bg-midnight px-8 py-3 text-white"
					onClick={onSubmitHandler}
				>
					Submit
				</button>
			</div>
		</div>
	);
};
