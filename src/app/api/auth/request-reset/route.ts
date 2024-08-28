import { type NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { sql } from "@vercel/postgres";
import sgMail from "@sendgrid/mail";

import { type RequestResetRequest } from "@/lib/types";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(request: NextRequest) {
	const { email } = (await request.json()) as RequestResetRequest;

	if (!email) {
		return NextResponse.json({ message: "Email is required" }, { status: 400 });
	}

	const user = await sql`
    SELECT * FROM users WHERE email = ${email}`;

	if (user.rows.length === 0) {
		return NextResponse.json({ message: "User not found" }, { status: 404 });
	}

	const resetToken = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: "1h" });
	await sql`
    UPDATE users SET reset_token = ${resetToken} WHERE email = ${email}`;

	const msg = {
		to: email,
		from: "bartosz.lewandowski@asttero.dev",
		subject: "Password Reset - Make Your Life Better",
		text: `You requested a password reset. Click the link to reset your password: ${process.env.NEXT_PUBLIC_FRONTEND_URL}/reset-password?token=${resetToken}`,
		html: `<strong>You requested a password reset. Click the link to reset your password:</strong> <a href="${process.env.NEXT_PUBLIC_FRONTEND_URL}/reset-password?token=${resetToken}">Reset Password</a>`,
	};

	try {
		await sgMail.send(msg);
		const response = NextResponse.json({ message: "Password reset email sent" }, { status: 200 });

		response.cookies.set("auth-token", "", { httpOnly: true, secure: true, expires: new Date(0) });

		return response;
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : "Unknown error";
		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}
