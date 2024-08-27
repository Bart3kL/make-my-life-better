import { type NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

import { cloudinary } from "@/lib/cloudinary";

export async function POST(request: NextRequest) {
	const { userEmail, structure, status, title, image } = await request.json();

	if (!userEmail || !structure || !status || !title) {
		return NextResponse.json({ message: "All fields are required" }, { status: 400 });
	}

	const uploadedImage = await cloudinary.uploader.upload(image, {
		folder: "blog/articles",
	});

	try {
		const result = await sql`
      INSERT INTO blogPosts (userEmail, structure, status, title,image)
      VALUES (${userEmail}, ${structure}, ${status}, ${title},${uploadedImage.secure_url})
      RETURNING id, userEmail, structure, status, title, createdAt, image
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
