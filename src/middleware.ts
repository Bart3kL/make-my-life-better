import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export interface NextRequestWithUser extends NextRequest {
	user?: any;
}

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname;
	console.log(`Incoming request for path: ${path}`);

	const publicPages = ["/", "/signup", "/signin", "/reset", "/reset-password"];

	if (publicPages.includes(path) || PUBLIC_FILE.test(path)) {
		return NextResponse.next();
	}

	const token = request.cookies.get("auth-token")?.value;

	if (!token) {
		console.log("No token found, redirecting to /signin");
		return NextResponse.redirect(new URL("/signin", request.url));
	}

	try {
		const secret = process.env.JWT_SECRET;
		if (!secret) {
			throw new Error("JWT_SECRET is not defined");
		}

		const secretKey = new TextEncoder().encode(secret);
		const { payload } = await jwtVerify(token, secretKey);
		(request as NextRequestWithUser).user = payload;

		return NextResponse.next();
	} catch (error) {
		console.error("Token verification failed:", error);
		return NextResponse.redirect(new URL("/signin", request.url));
	}
}

export const config = {
	matcher: [
		// Match all request paths except for the ones defined here
		"/((?!api|_next/static|_next/image|favicon.ico).*)",
	],
};
