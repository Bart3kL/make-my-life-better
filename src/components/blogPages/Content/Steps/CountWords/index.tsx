import { PlaceholdersAndVanishInput } from "@/components/shared/AnimatedInput";

export const CountWords = ({ placeholders, handleChange, handleSubmit, error }: any) => {
	return (
		<>
			<h2 className="mb-10 text-center text-xl text-midnight md:mb-20 md:text-3xl">
				Enter an average number of words for each headline
			</h2>
			<div className="mx-auto w-full max-w-xl">
				<PlaceholdersAndVanishInput
					placeholders={["200", "300", "400", "500"]}
					onChange={handleChange}
					id="headerLength"
					onSubmit={handleSubmit}
				/>
				{error && <p className="mt-2 text-red-500">{error}</p>}
			</div>
		</>
	);
};
