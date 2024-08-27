import { type NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sql } from "@vercel/postgres";

export async function POST(request: NextRequest) {
	const { firstname, lastname, email, password } = await request.json();

	if (!firstname || !lastname || !email || !password) {
		return NextResponse.json({ message: "All fields are required" }, { status: 400 });
	}

	const existingUser = await sql`SELECT * FROM users WHERE email = ${email}`;
	if (existingUser.rows.length > 0) {
		return NextResponse.json({ message: "User already exists" }, { status: 400 });
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	await sql`
    INSERT INTO users (firstname, lastname, email, password)
    VALUES (${firstname}, ${lastname}, ${email}, ${hashedPassword})
  `;

	const token = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: "1h" });

	return NextResponse.json({ message: "User created", token }, { status: 201 });
}
