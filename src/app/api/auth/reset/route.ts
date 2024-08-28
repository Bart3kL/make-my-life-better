import { type NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { sql } from "@vercel/postgres";

import { type ResetRequest } from "@/lib/types";

export async function POST(request: NextRequest) {
	const { token, newPassword } = (await request.json()) as ResetRequest;

	if (!token || !newPassword) {
		return NextResponse.json({ message: "Token and new password are required" }, { status: 400 });
	}

	if (!token) {
		return NextResponse.json({ message: "Authorization header is missing" }, { status: 401 });
	}

	let userEmail: string;
	try {
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload & {
			email: string;
		};
		userEmail = decodedToken.email;
	} catch {
		return NextResponse.json({ message: "Invalid token" }, { status: 401 });
	}

	try {
		const user =
			await sql`SELECT * FROM users WHERE email = ${userEmail} AND reset_token = ${token}`;
		if (user.rows.length === 0) {
			return NextResponse.json({ message: "Invalid token or user not found" }, { status: 400 });
		}

		const hashedPassword = await bcrypt.hash(newPassword, 10);

		await sql`UPDATE users SET password = ${hashedPassword}, reset_token = NULL WHERE email = ${userEmail}`;

		return NextResponse.json({ message: "Password updated successfully" }, { status: 200 });
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : "Unknown error";
		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}
