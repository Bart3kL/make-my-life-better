"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/redux/store";
import { setAuthStatus, setUser } from "@/redux/auth";

const GetCurrentUser = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const fetchCurrentUser = async () => {
			try {
				const response = await fetch("/api/auth/me");
				const data = await response.json();
				if (response.ok) {
					dispatch(setUser(data));
					dispatch(setAuthStatus(true));
				} else {
					console.error("Failed to fetch user data:", data);
				}
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};

		fetchCurrentUser();
	}, [dispatch]);

	return null;
};

export default GetCurrentUser;
