import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const response = NextResponse.json({ message: "Logged out successfully" }, { status: 200 });
	console.log("object");
	response.cookies.set("auth-token", "", { httpOnly: true, secure: true, expires: new Date(0) });

	return response;
}
