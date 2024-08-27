import { type NextRequest, NextResponse } from "next/server";
import { jwtVerify, type JWTPayload } from "jose";

export interface NextRequestWithUser extends NextRequest {
	user?: JWTPayload;
}

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname;

	const authPages = ["/signin", "/signup"];
	const publicPages = ["/", "/reset", "/reset-password"];

	// Allow access to public files and pages
	if (publicPages.includes(path) || PUBLIC_FILE.test(path)) {
		return NextResponse.next();
	}

	const token = request.cookies.get("auth-token")?.value;

	if (!token) {
		if (authPages.includes(path)) {
			// Allow access to signin and signup pages if not authenticated.
			return NextResponse.next();
		}
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

		// Redirect authenticated users from signin and signup pages to dashboard.
		if (authPages.includes(path)) {
			console.log("User authenticated, redirecting to /dashboard");
			return NextResponse.redirect(new URL("/dashboard", request.url));
		}

		return NextResponse.next();
	} catch (error: unknown) {
		if (error instanceof Error) {
			if (error.name === "JWTExpired") {
				console.log("Token expired, removing auth-token cookie and redirecting to /signin");
				// Create a new response to modify headers for removing the cookie
				const response = NextResponse.redirect(new URL("/signin", request.url));
				response.cookies.delete("auth-token");
				return response;
			} else {
				console.error("Token verification failed:", error);
				const response = NextResponse.redirect(new URL("/signin", request.url));
				response.cookies.delete("auth-token");
				return response;
			}
		} else {
			console.error("Unknown error occurred", error);
			const response = NextResponse.redirect(new URL("/signin", request.url));
			response.cookies.delete("auth-token");
			return response;
		}
	}
}

export const config = {
	matcher: [
		// Match all request paths except for the ones defined here
		"/((?!api|_next/static|_next/image|favicon.ico).*)",
	],
};
