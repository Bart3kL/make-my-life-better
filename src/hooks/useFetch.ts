import { cookies } from "next/headers";
import { type UseFetchProps } from "@/lib/types";

export const useFetch = async <T>({ endpoint, method, requestBody }: UseFetchProps): Promise<T> => {
	const url = process.env.BASE_URL || "http://localhost:3000";
	const authToken = cookies().get("auth-token")?.value;

	try {
		const options: RequestInit = {
			method,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${authToken}`,
			},
		};

		if (method !== "GET") {
			options.body = requestBody;
		}

		const response: Response = await fetch(`${url}/api${endpoint}`, options);

		const data: T = (await response.json()) as T;
		return data;
	} catch (error) {
		console.error("Fetch error:", error);
		throw error;
	}
};
