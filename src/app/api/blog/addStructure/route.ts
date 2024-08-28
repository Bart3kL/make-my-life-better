import { type NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import jwt from "jsonwebtoken";

import { cloudinary } from "@/lib/cloudinary";
import { type AddStructureRequest } from "@/lib/types";

export async function POST(request: NextRequest) {
	const { userEmail, structure, status, title, image } =
		(await request.json()) as AddStructureRequest;

	const authHeader = request.headers.get("Authorization");
	const token = authHeader ? authHeader.split(" ")[1] : null;

	if (!token) {
		return NextResponse.json({ message: "Authorization header is missing" }, { status: 401 });
	}

	try {
		jwt.verify(token, process.env.JWT_SECRET!);
	} catch {
		return NextResponse.json({ message: "Invalid token" }, { status: 401 });
	}

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
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : "Unknown error";
		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}
