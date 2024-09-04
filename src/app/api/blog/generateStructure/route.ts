import { type NextRequest, NextResponse } from "next/server";
import jwt, { type JwtPayload } from "jsonwebtoken";

import { openai } from "@/lib/ai/client";
import { type GenerateBlogPostStructureProps } from "@/lib/ai/prompts/types";
import { generateBlogPostStructure } from "@/lib/ai/prompts/generateBlogPostStructure";

export async function POST(request: NextRequest) {
	const { titleBlogPost, processedData } = (await request.json()) as GenerateBlogPostStructureProps;

	const token = request.headers.get("Authorization")?.split(" ")[1];
	if (!token) {
		return NextResponse.json({ message: "Authorization header is missing" }, { status: 401 });
	}

	try {
		jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload & {
			email: string;
		};
	} catch {
		return NextResponse.json({ message: "Invalid token" }, { status: 401 });
	}

	try {
		const prompt = generateBlogPostStructure({
			titleBlogPost,
			processedData,
		});

		const response = await openai.chat.completions.create({
			model: "gpt-4o",
			messages: [{ role: "user", content: prompt }],
			max_tokens: 3000,
			temperature: 0.7,
		});

		const blogStructure = response.choices[0].message.content!.trim();

		return NextResponse.json({ blogStructure }, { status: 200 });
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : "Unknown error";
		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}
