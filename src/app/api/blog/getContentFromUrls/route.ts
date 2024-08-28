import { type NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";
import jwt, { type JwtPayload } from "jsonwebtoken";

import { type GetContentFromUrlReequest } from "@/lib/types";

export async function POST(request: NextRequest) {
	const { urls } = (await request.json()) as GetContentFromUrlReequest;

	const authHeader = request.headers.get("Authorization");
	const token = authHeader ? authHeader.split(" ")[1] : null;

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

	if (!urls || !Array.isArray(urls)) {
		return NextResponse.json({ error: "Invalid URLs" }, { status: 400 });
	}

	try {
		const browser = await puppeteer.launch({
			headless: true,
			args: ["--no-sandbox", "--disable-setuid-sandbox"],
		});
		const page = await browser.newPage();
		const contentArray: string[] = [];

		for (const url of urls) {
			try {
				await page.goto(url, { waitUntil: "domcontentloaded" });

				const content = await page.evaluate(() => {
					const body = document.body;
					if (!body) return "";

					function getTextWithoutScriptsAndStyles(element: HTMLElement): string {
						return Array.from(element.childNodes)
							.filter(
								(node) =>
									node.nodeType === Node.TEXT_NODE ||
									(node.nodeType === Node.ELEMENT_NODE &&
										!["SCRIPT", "STYLE", "NOSCRIPT"].includes((node as Element).tagName)),
							)
							.map((node) =>
								node.nodeType === Node.TEXT_NODE
									? node.textContent
									: getTextWithoutScriptsAndStyles(node as HTMLElement),
							)
							.filter((text) => !!text)
							.join(" ");
					}

					return getTextWithoutScriptsAndStyles(body).replace(/\s+/g, " ").trim();
				});

				contentArray.push(content);
			} catch (error) {
				console.error(`Error fetching content from ${url}:`, error);
				contentArray.push("");
			}
		}

		await browser.close();
		return NextResponse.json({ contents: contentArray }, { status: 200 });
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : "Unknown error";
		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}
