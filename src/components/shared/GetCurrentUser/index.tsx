"use client";

import { useEffect } from "react";
import { type UserProps } from "./types";
import { useAppDispatch } from "@/redux/store";
import { setAuthStatus, setUser } from "@/redux/auth";

export const GetCurrentUser = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const fetchCurrentUser = async () => {
			try {
				const response = await fetch("/api/auth/me");
				const data = (await response.json()) as UserProps;

				console.log({ data });
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

		void fetchCurrentUser();
	}, [dispatch]);

	return null;
};
