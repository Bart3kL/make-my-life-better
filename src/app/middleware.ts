import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export interface NextRequestWithUser extends NextRequest {
	user?: any;
}

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname;

	const publicPages = ["/", "/signup", "/signin", "/reset"];

	if (publicPages.includes(path) || PUBLIC_FILE.test(path)) {
		return NextResponse.next();
	}

	const token = request.cookies.get("auth-token")?.value;

	if (!token) {
		return NextResponse.redirect(new URL("/signin", request.url));
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET!);
		(request as NextRequestWithUser).user = decoded;
		return NextResponse.next();
	} catch (error) {
		return NextResponse.redirect(new URL("/signin", request.url));
	}
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones defined here
		 */
		"/((?!api|_next/static|_next/image|favicon.ico).*)",
	],
};
