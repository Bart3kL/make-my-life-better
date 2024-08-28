export interface AdditionalKnowledgeProps {
	files: File[];
	knowledgeText: string;
	knowledgeUrls: string;
	handleFileUpload: (newFiles: File[]) => void;
	handleFileDelete: (fileToDelete: File) => void;
	handleSubmit: () => void;
	handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	error?: string;
}
