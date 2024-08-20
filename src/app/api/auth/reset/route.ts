import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sql } from "@vercel/postgres";

export async function POST(request: NextRequest) {
	const { token, newPassword } = await request.json();

	if (!token || !newPassword) {
		return NextResponse.json({ message: "Token and new password are required" }, { status: 400 });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET!);
		const email = (decoded as any).email;

		const user = await sql`SELECT * FROM users WHERE email = ${email} AND reset_token = ${token}`;
		if (user.rows.length === 0) {
			return NextResponse.json({ message: "Invalid token or user not found" }, { status: 400 });
		}

		const hashedPassword = await bcrypt.hash(newPassword, 10);

		await sql`UPDATE users SET password = ${hashedPassword}, reset_token = NULL WHERE email = ${email}`;

		return NextResponse.json({ message: "Password updated successfully" }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });
	}
}
