import { type NextRequest, NextResponse } from "next/server";
import jwt, { type JwtPayload } from "jsonwebtoken";

import { type CreateContentRequest } from "@/lib/types";
import { openai } from "@/lib/ai/client";

export async function POST(request: NextRequest) {
	try {
		const body = (await request.json()) as CreateContentRequest;
		const { title, header, headers, style, headerLength } = body;

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

		if (!title || !header || !headers) {
			return NextResponse.json({ message: "Missing required parameters" }, { status: 400 });
		}

		const stream = await openai.chat.completions.create({
			model: "gpt-4",
			max_tokens: 50,
			messages: [
				{
					role: "system",
					content: `
                    Title of blog post: ${title}
                    Write extensive content for the header provided by the user.
                    Headers: ${JSON.stringify(headers.map((h) => h.data.text))}
                    Każdy nagłówek ma mieć około ${headerLength} słów
					
					
					Pisz w takim stylu wypowiedzi:
					${style}
					`,
				},
				{ role: "user", content: `Current header: ${header}` },
			],
			stream: true,
		});

		const encoder = new TextEncoder();

		const readableStream = new ReadableStream({
			async start(controller) {
				for await (const chunk of stream) {
					const text = chunk.choices[0]?.delta?.content || "";
					controller.enqueue(encoder.encode(text));
				}
				controller.close();
			},
		});

		return new Response(readableStream, {
			headers: { "Content-Type": "text/plain; charset=UTF-8" },
			status: 200,
		});
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : "Unknown error";
		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}
