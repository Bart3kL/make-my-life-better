import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function PUT(request: NextRequest) {
	const { structure, status, postId } = await request.json();

	const token = request.headers.get("Authorization")?.split(" ")[1];
	if (!token) {
		return NextResponse.json({ message: "Authorization header is missing" }, { status: 401 });
	}

	const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload & {
		email: string;
	};
	const userEmail = decodedToken.email;

	if (!structure || !userEmail) {
		return NextResponse.json(
			{ message: "Headings structure and user email are required" },
			{ status: 400 },
		);
	}

	try {
		const result = await sql`
		UPDATE blogPosts
		SET structure = ${structure}, status = ${status}
		WHERE userEmail = ${userEmail} AND id = ${postId}
		RETURNING id, userEmail, structure, status, title, createdAt, image
	`;
		if (result.rowCount === 0) {
			return NextResponse.json({ message: "Blog post not found" }, { status: 404 });
		}

		const updatedBlogPost = result.rows[0];
		return NextResponse.json(
			{ message: "Blog post updated", blogPost: updatedBlogPost },
			{ status: 200 },
		);
	} catch (error: any) {
		console.error("Error updating blog post:", error);
		return NextResponse.json(
			{ message: "Error updating blog post", error: error.message },
			{ status: 500 },
		);
	}
}
