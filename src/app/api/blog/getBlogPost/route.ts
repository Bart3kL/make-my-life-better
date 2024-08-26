import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { sql } from "@vercel/postgres";

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const blogPostId = searchParams.get("blogPostId");
	const status = searchParams.get("status");

	if (!blogPostId) {
		return NextResponse.json({ message: "Blog post ID is required" }, { status: 400 });
	}

	const token = request.headers.get("Authorization")?.split(" ")[1];
	if (!token) {
		return NextResponse.json({ message: "Authorization header is missing" }, { status: 401 });
	}

	try {
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload & {
			email: string;
		};
		const userEmail = decodedToken.email;

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
	} catch (error: any) {
		console.error("Error fetching blog post:", error);
		return NextResponse.json(
			{ message: "Error fetching blog post", error: error.message },
			{ status: 500 },
		);
	}
}
