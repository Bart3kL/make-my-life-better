import { type NextRequest, NextResponse } from "next/server";
import { openai } from "@/lib/ai/client";
import { generateBlogPostStructure } from "@/lib/ai/prompts/generateBlogPostStructure";

export async function POST(request: NextRequest) {
	const { titleBlogPost, processedData } = await request.json();

	try {
		const prompt = generateBlogPostStructure({
			titleBlogPost,
			processedData,
		});

		const response = await openai.chat.completions.create({
			model: "gpt-4o-2024-08-06",
			messages: [{ role: "user", content: prompt }],
			max_tokens: 3000,
			temperature: 0.7,
		});

		const blogStructure = response.choices[0].message.content!.trim();

		return NextResponse.json({ blogStructure }, { status: 200 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
