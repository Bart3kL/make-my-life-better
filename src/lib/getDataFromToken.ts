import jwt from "jsonwebtoken";
import { type NextRequest } from "next/server";

import { type DecodedToken } from "./types";

export const getDataFromToken = (req: NextRequest): string | Error => {
	try {
		const token = req.cookies.get("auth-token")?.value || "";

		const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

		return decodedToken.email;
	} catch (error) {
		if (error instanceof Error) {
			return new Error(error.message);
		}

		return new Error("An unknown error occurred");
	}
};
