import { type NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import jwt, { type JwtPayload } from "jsonwebtoken";

import { type UpdatePostRequest } from "@/lib/types";

export async function PUT(request: NextRequest) {
	const { structure, status, postId, title } = (await request.json()) as UpdatePostRequest;

	const authHeader = request.headers.get("Authorization");
	const token = authHeader ? authHeader.split(" ")[1] : null;

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

	if (!structure || !userEmail) {
		return NextResponse.json(
			{ message: "Headings structure and user email are required" },
			{ status: 400 },
		);
	}

	try {
		let result;
		if (title) {
			result = await sql`
                UPDATE blogPosts
                SET structure = ${structure}, status = ${status}, title = ${title}
                WHERE userEmail = ${userEmail} AND id = ${postId}
                RETURNING id, userEmail, structure, status, title, createdAt, image
            `;
		} else {
			result = await sql`
                UPDATE blogPosts
                SET structure = ${structure}, status = ${status}
                WHERE userEmail = ${userEmail} AND id = ${postId}
                RETURNING id, userEmail, structure, status, title, createdAt, image
            `;
		}

		if (result.rowCount === 0) {
			return NextResponse.json({ message: "Blog post not found" }, { status: 404 });
		}

		const updatedBlogPost = result.rows[0];
		return NextResponse.json(
			{ message: "Blog post updated", blogPost: updatedBlogPost },
			{ status: 200 },
		);
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : "Unknown error";
		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}
