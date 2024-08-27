import { type RejectionInfoProps } from "./types";

export const RejectionInfo = ({ file, errors }: RejectionInfoProps) => {
	return (
		<div key={file.name}>
			<p>
				{file.name} - {file.size} bytes
			</p>
			<ul>
				{errors.map((e) => (
					<li key={e.code}>{e.message}</li>
				))}
			</ul>
		</div>
	);
};
