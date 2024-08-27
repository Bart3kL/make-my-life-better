import { cookies } from "next/headers";
import { type UseFetchProps } from "@/lib/types";

export const useFetch = async <T>({ endpoint, status, fields }: UseFetchProps): Promise<T> => {
	const url = process.env.BASE_URL || "http://localhost:3000";
	const authToken = cookies().get("auth-token")?.value;

	const requestBody = JSON.stringify({ status, fields });

	try {
		const response: Response = await fetch(`${url}/api/${endpoint}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${authToken}`,
			},
			body: requestBody,
		});

		const data: T = (await response.json()) as T;
		return data;
	} catch (error) {
		console.error("Fetch error:", error);
		throw error;
	}
};
