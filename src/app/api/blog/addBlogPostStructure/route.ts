import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(request: NextRequest) {
	const { userEmail, structure, status, title } = await request.json();

	console.log("Received structure:", structure);

	if (!userEmail || !structure || !status || !title) {
		return NextResponse.json({ message: "All fields are required" }, { status: 400 });
	}

	try {
		const result = await sql`
      INSERT INTO blogPosts (userEmail, structure, status, title)
      VALUES (${userEmail}, ${structure}, ${status}, ${title})
      RETURNING id, userEmail, structure, status, title, createdAt
    `;

		const newBlogPost = result.rows[0];
		return NextResponse.json(
			{ message: "Blog post created", blogPost: newBlogPost },
			{ status: 201 },
		);
	} catch (error: any) {
		console.error("Error creating blog post:", error);
		return NextResponse.json(
			{ message: "Error creating blog post", error: error.message },
			{ status: 500 },
		);
	}
}
