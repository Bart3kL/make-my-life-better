import { type NextRequest, NextResponse } from "next/server";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { sql } from "@vercel/postgres";

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const blogPostId = searchParams.get("blogPostId");
	const status = searchParams.get("status");

	const token = request.headers.get("Authorization")?.split(" ")[1];
	if (!token) {
		return NextResponse.json({ message: "Authorization header is missing" }, { status: 401 });
	}

	let userEmail: string;
	try {
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload & {
			email: string;
		};
		userEmail = decodedToken.email;
	} catch {
		return NextResponse.json({ message: "Invalid token" }, { status: 401 });
	}

	if (!blogPostId) {
		return NextResponse.json({ message: "Blog post ID is required" }, { status: 400 });
	}

	try {
		const result = await sql`
      SELECT * FROM blogPosts WHERE id = ${blogPostId} AND userEmail = ${userEmail} AND status = ${status}
    `;

		if (result.rows.length === 0) {
			return NextResponse.json(
				{ message: "Blog post not found or access denied" },
				{ status: 404 },
			);
		}

		const blogPost = result.rows[0];
		return NextResponse.json({ message: "Blog post fetched", blogPost }, { status: 200 });
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : "Unknown error";
		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}
