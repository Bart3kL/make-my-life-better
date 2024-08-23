import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
	const { titleBlogPost, processedData } = await request.json();

	try {
		const prompt = `
                Stwórz strukturę blog posta o tytule "${titleBlogPost}". Użyj poniższej bazy danych jako kontekstu:
                ${JSON.stringify(processedData, null, 2)}

                Struktura blog posta powinna być w formie tablicy nagłówków:
                [<h1>Tytuł</h1>, <h2>Nagłówek 1</h2>, <h2>Podnagłówek 1.1</h2>, <h2>Nagłówek 2</h2>, ...]


                Zwróć tylko tablicę stringów, bez dodawania żadnych informacji.

                **Prawidłowy format odpowiedzi:**
                [
                    "<h1>Blogowanie dla początkujących</h1>",
                    "<h2>Wprowadzenie</h2>",
                    "<h2>Dlaczego warto prowadzić bloga?</h2>",
                    "<h2>Jak zacząć?</h2>",
                    "<h2>Wybór platformy</h2>",
                    "<h2>Tworzenie treści</h2>",
                    "<h2>Narzędzia i zasoby</h2>",
                    "<h2>Kilka wskazówek na zakończenie</h2>"
                ]

                **Nieprawidłowy format odpowiedzi 1**
                    Oto przykładowa struktura blog posta o tytule "asdas":

                   html
                    [
                        "<h1>asdas</h1>",
                        "<h2>Wprowadzenie</h2>",
                        "<h2>Dlaczego warto zgłębić temat asdas?</h2>",
                        "<h2>Podstawowe informacje o asdas</h2>",
                        "<h2>Zalety i wady asdas</h2>",
                        "<h2>Praktyczne zastosowania asdas</h2>",
                        "<h2>Przyszłość asdas</h2>",
                        "<h2>Podsumowanie</h2>"
                    ]

                **Nieprawidłowy format odpowiedzi 2**
                    Oto przykładowa struktura blog posta o tytule "asdas":

                   json
                    [
                        "<h1>asdas</h1>",
                        "<h2>Wprowadzenie</h2>",
                        "<h2>Dlaczego warto zgłębić temat asdas?</h2>",
                        "<h2>Podstawowe informacje o asdas</h2>",
                        "<h2>Zalety i wady asdas</h2>",
                        "<h2>Praktyczne zastosowania asdas</h2>",
                        "<h2>Przyszłość asdas</h2>",
                        "<h2>Podsumowanie</h2>"
                    ]
                    


        `;

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
