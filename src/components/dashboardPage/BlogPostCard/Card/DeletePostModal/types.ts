export interface DeletePostModalProps {
	isOpen: boolean;
	handleClose: () => void;
	postId: number;
	token: string;
}
