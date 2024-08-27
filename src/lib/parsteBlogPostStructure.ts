import { type ParsedHeader } from "./types";

export const parseStructure = (structureString: string): ParsedHeader[] => {
	const structureArray: string[] = JSON.parse(structureString) as string[];

	return structureArray.map<ParsedHeader>((item) => {
		const parser = new DOMParser();
		const doc = parser.parseFromString(item, "text/html");
		const header = doc.body.firstChild;

		if (!(header instanceof HTMLElement)) {
			throw new Error("Invalid header element");
		}

		return {
			id: Math.random().toString(36).substring(7),
			type: "header",
			data: {
				text: header.textContent,
				level: Number(header.tagName.replace("H", "")),
			},
		};
	});
};
