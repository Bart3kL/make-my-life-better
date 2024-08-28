import { type NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sql } from "@vercel/postgres";

import { type SignInRequest } from "@/lib/types";

export async function POST(request: NextRequest) {
	const { email, password } = (await request.json()) as SignInRequest;

	if (!email || !password) {
		return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
	}

	const userResult = await sql`SELECT * FROM users WHERE email = ${email}`;

	if (userResult.rows.length === 0) {
		return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
	}

	const user = userResult.rows[0] as { email: string; password: string };

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
	}

	const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET!, { expiresIn: "1h" });

	const response = NextResponse.json({ message: "Signed in successfully", token }, { status: 200 });

	const options = {
		httpOnly: true,
		secure: true,
		expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
	};
	response.cookies.set("auth-token", token, options);

	return response;
}
