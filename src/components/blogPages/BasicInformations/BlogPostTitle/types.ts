export interface BlogPostTitleProps {
	placeholders: string[];
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleSubmit: () => void;
	error?: string;
}
