export const parseStructure = (structureString: string) => {
	const structureArray = JSON.parse(structureString);

	return structureArray.map((item: string) => {
		const parser = new DOMParser();
		const doc = parser.parseFromString(item, "text/html");
		const header: any = doc.body.firstChild;

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
