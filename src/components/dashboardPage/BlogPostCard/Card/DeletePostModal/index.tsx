/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";

import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	CircularProgress,
} from "@mui/material";
import { useRouter } from "next/navigation";

import { type DeletePostModalProps } from "./types";

export const DeletePostModal = ({ isOpen, postId, token, handleClose }: DeletePostModalProps) => {
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(false);

	const deletePost = async () => {
		try {
			setIsLoading(true);
			const response = await fetch(`/api/blog/deletePost?id=${postId}`, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (!response.ok) {
				throw new Error("Failed to delete the post");
			}

			handleClose();

			router.refresh();
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog open={isOpen} onClose={handleClose}>
			<DialogTitle>Are you sure you want to delete this post?</DialogTitle>
			<DialogContent>
				<DialogContentText>
					You cannot undo this action, perhaps you just want to edit instead?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button color="error" onClick={deletePost} disabled={isLoading}>
					{isLoading ? <CircularProgress size={24} /> : "Yes, Delete"}
				</Button>
				<Button onClick={handleClose}>No, Cancel</Button>
			</DialogActions>
		</Dialog>
	);
};
