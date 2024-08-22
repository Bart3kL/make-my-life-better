import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlaceholdersAndVanishInput } from "@/components/shared/AnimatedInput";
import { FileUpload } from "@/components/shared/FileUpload";
import { Label } from "@/components/shared/Label";
import { LabelInputContainer } from "@/components/shared/LabelInputContainer";

export const BlogStructure = () => {
	const [step, setStep] = useState(1);

	const placeholders = [
		"Best AI for Coding - tools for developers",
		"WooCommerce vs Shopify",
		"The best Shopify apps for growing your shop",
		"How to reduce abandoned shopping carts in Shopify store?",
	];

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.value);
	};

	const onSubmitStep1 = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("Step 1 submitted");
		setStep(2); // Przejdź do kroku 2
	};

	const onSubmitStep2 = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("Step 2 submitted");
		// Przejdź do kroku 3, lub wykonaj inne akcje...
	};

	return (
		<div className="relative w-full overflow-hidden rounded-2xl border-2 border-paleLavender bg-gradient-to-br from-white to-white-2 p-10 font-bold text-midnight">
			{step === 1 && (
				<div>
					<h2 className="mb-10 text-center text-xl text-midnight md:mb-20 md:text-3xl">
						Enter blog post title
					</h2>
					<div className="mx-auto w-full max-w-xl">
						<PlaceholdersAndVanishInput
							placeholders={placeholders}
							onChange={handleChange}
							id="titleBlogPost"
							onSubmit={onSubmitStep1}
						/>
						<button
							type="submit"
							className="mt-6 rounded-md bg-blue-500 px-8 py-3 text-white transition-colors duration-200 ease-in-out hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
						>
							Next
						</button>
					</div>
				</div>
			)}

			{step === 2 && (
				<div>
					<h2 className="text-center text-xl text-midnight md:text-3xl">Upload a file</h2>

					<div className="mx-auto w-full max-w-xl">
						<FileUpload />
						<button
							type="submit"
							className="mt-6 rounded-md bg-green-500 px-8 py-3 text-white transition-colors duration-200 ease-in-out hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
						>
							Submit
						</button>
					</div>
				</div>
			)}
		</div>
	);
};
