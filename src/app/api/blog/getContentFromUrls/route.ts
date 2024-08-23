import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function POST(request: NextRequest) {
	const { urls } = await request.json();

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

				// Extract meaningful text
				const content = await page.evaluate(() => {
					const body = document.body;
					if (!body) return "";

					// Simple way to retrieve textContent without unwanted text
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
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
