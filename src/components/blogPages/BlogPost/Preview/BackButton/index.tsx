"use client";
import { useRouter } from "next/navigation";

import { Button } from "@mui/material";
import { FaArrowLeft } from "react-icons/fa";

export const BackButton = ({ id }: { id: string }) => {
	const router = useRouter();
	return (
		<Button color="primary" variant="outlined" onClick={() => router.push(`/blog/post/${id}`)}>
			<FaArrowLeft /> <p className="ml-2">back</p>
		</Button>
	);
};
