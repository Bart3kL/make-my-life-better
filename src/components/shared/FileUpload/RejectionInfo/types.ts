export interface RejectionInfoProps {
	file: File;
	errors: {
		code: string;
		message: string;
	}[];
}
