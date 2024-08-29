import { type ChecklistProps } from "./types";

export const Checklist = ({ data }: ChecklistProps) => {
	return (
		<>
			{data?.items.map((item, i) => (
				<p key={i} style={{ marginTop: "1rem", marginBottom: "1rem" }}>
					<label>
						<input type="checkbox" checked={item.checked} /> {item.text}
					</label>
				</p>
			))}
		</>
	);
};
