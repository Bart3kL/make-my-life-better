import { type NextRequest, NextResponse } from "next/server";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { sql } from "@vercel/postgres";

import { type GetAllBlogPostsRequest } from "@/lib/types";

export async function POST(request: NextRequest) {
	try {
		const { status, fields } = (await request.json()) as GetAllBlogPostsRequest;

		const validStatuses = ["published", "draft", "onlyStructure", "prepared"];
		if (!validStatuses.includes(status)) {
			return NextResponse.json(
				{ message: "Please enter correct blog post status" },
				{ status: 400 },
			);
		}

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

		const allFields = [
			"id",
			"useremail",
			"content",
			"status",
			"createdat",
			"title",
			"structure",
			"image",
			"url",
		];
		let selectedFields = allFields;
		if (fields) {
			selectedFields = fields.split(",").filter((field: string) => allFields.includes(field));

			if (selectedFields.length === 0) {
				return NextResponse.json({ message: "No valid fields selected" }, { status: 400 });
			}
		}

		const query = `
			SELECT ${selectedFields.join(", ")} FROM blogPosts
			WHERE status = $1 AND userEmail = $2
		`;

		const result = await sql.query(query, [status, userEmail]);

		if (result.rowCount === 0) {
			return NextResponse.json(
				{ message: "Blog posts not found or access denied" },
				{ status: 404 },
			);
		}

		const blogPosts = result.rows;
		return NextResponse.json({ message: "Blog posts fetched", blogPosts }, { status: 200 });
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : "Unknown error";
		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}
