import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { sql } from "@vercel/postgres";
import mailgun from "mailgun-js";

const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY!, domain: process.env.MAILGUN_DOMAIN! });

export async function POST(request: NextRequest) {
	const { email } = await request.json();

	if (!email) {
		return NextResponse.json({ message: "Email is required" }, { status: 400 });
	}

	const user = await sql`SELECT * FROM users WHERE email = ${email}`;
	if (user.rows.length === 0) {
		return NextResponse.json({ message: "User not found" }, { status: 404 });
	}

	const resetToken = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: "1h" });
	await sql`UPDATE users SET reset_token = ${resetToken} WHERE email = ${email}`;

	const msg = {
		from: `YourApp <no-reply@${process.env.MAILGUN_DOMAIN}>`,
		to: email,
		subject: "Password Reset",
		text: `You requested a password reset. Click the link to reset your password: ${process.env.NEXT_PUBLIC_FRONTEND_URL}/reset-password?token=${resetToken}`,
		html: `<strong>You requested a password reset. Click the link to reset your password:</strong> <a href="${process.env.NEXT_PUBLIC_FRONTEND_URL}/reset-password?token=${resetToken}">Reset Password</a>`,
	};

	mg.messages().send(msg, function (error, body) {
		if (error) {
			return NextResponse.json({ message: "Error sending email", error }, { status: 500 });
		}
	});

	return NextResponse.json({ message: "Password reset email sent" }, { status: 200 });
}
