import { FormControl, MenuItem, Select } from "@mui/material";

import { type StyleSelectorProps } from "./types";

export const StyleSelector = ({ style, handleChange, handleSubmit }: StyleSelectorProps) => {
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
						Formalny
					</MenuItem>
					<MenuItem value="informal" id="style">
						Nieformalny
					</MenuItem>
					<MenuItem value="technical" id="style">
						Techniczny
					</MenuItem>
					<MenuItem value="literary" id="style">
						Literacki
					</MenuItem>
				</Select>
			</FormControl>
			<div className="mx-auto flex w-full max-w-xl flex-col justify-items-center">
				<button
					type="submit"
					className="mt-6 rounded-md bg-midnight px-8 py-3 text-white"
					onClick={handleSubmit}
				>
					Submit
				</button>
			</div>
		</div>
	);
};
