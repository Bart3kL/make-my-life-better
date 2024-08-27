export type ParsedHeader = {
	id: string;
	type: "header";
	data: {
		text: string | null;
		level: number;
	};
};

export type DecodedToken = {
	email: string;
};

export interface UseFetchProps {
	endpoint: string;
	status: string;
	fields: string;
}
