import { GenerateBlogPostStructureProps } from "./types";

export const generateBlogPostStructure = ({
	titleBlogPost,
	processedData,
}: GenerateBlogPostStructureProps) => `
  Create a blog post structure with the title "${titleBlogPost}". Use the following database as context:
  ${JSON.stringify(processedData, null, 2)}

  The blog post structure should be in the form of an array of headings. 

  Return only the array of strings. Do not include any additional text, format specifiers (such as "json" or "html"), or explanations.

  **Correct response format:**
  [
      "<h2>Blogowanie dla początkujących</h2>",
      "<h2>Wprowadzenie</h2>",
      "<h2>Dlaczego warto prowadzić bloga?</h2>",
      "<h2>Jak zacząć?</h2>",
      "<h2>Wybór platformy</h2>",
      "<h2>Tworzenie treści</h2>",
      "<h2>Narzędzia i zasoby</h2>",
      "<h2>Kilka wskazówek na zakończenie</h2>"
  ]

  **Incorrect response formats:**
  - Any text before or after the array (e.g., "Here is your blog structure:")
  - Adding format specifiers such as "json", "html", or "javascript"
  - Returning anything other than a plain array of strings

  Ensure the response is in Polish and strictly adheres to the correct format.
`;
