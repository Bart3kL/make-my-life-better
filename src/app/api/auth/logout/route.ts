import { NextResponse } from "next/server";

export async function POST() {
	const response = NextResponse.json({ message: "Logged out successfully" }, { status: 200 });

	response.cookies.set("auth-token", "", { httpOnly: true, secure: true, expires: new Date(0) });

	return response;
}
