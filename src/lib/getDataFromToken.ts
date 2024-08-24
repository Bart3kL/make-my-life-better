/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken";
import { type NextRequest } from "next/server";

export const getDataFromToken = (req: NextRequest) => {
	try {
		const token = req.cookies.get("auth-token")?.value || "";
		const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);

		return decodedToken.email;
	} catch (error: any) {
		return new Error(error.message);
	}
};
