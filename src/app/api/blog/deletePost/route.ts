import { type NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import jwt from "jsonwebtoken";

interface JwtPayload {
	email: string;
}

export async function DELETE(request: NextRequest) {
	const url = new URL(request.url);
	const postId = url.searchParams.get("id");

	if (!postId) {
		return NextResponse.json({ message: "Post ID is required" }, { status: 400 });
	}

	const authHeader = request.headers.get("Authorization");
	const token = authHeader ? authHeader.split(" ")[1] : null;

	if (!token) {
		return NextResponse.json({ message: "Authorization header is missing" }, { status: 401 });
	}

	let decoded: JwtPayload;

	try {
		decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
	} catch {
		return NextResponse.json({ message: "Invalid token" }, { status: 401 });
	}

	try {
		const postResult = await sql`
            SELECT userEmail FROM blogposts
            WHERE id = ${postId}
        `;

		const post = postResult.rows[0];

		if (!post) {
			return NextResponse.json({ message: "Post not found" }, { status: 404 });
		}

		if (post.useremail !== decoded.email) {
			return NextResponse.json(
				{ message: "You are not authorized to delete this post" },
				{ status: 403 },
			);
		}

		// Usuwanie wpisu
		await sql`
            DELETE FROM blogPosts 
            WHERE id = ${postId}
        `;

		return NextResponse.json({ message: "Blog post deleted", postId }, { status: 200 });
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : "Unknown error";
		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}
