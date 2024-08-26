import { ImageProps } from "./types";

import { FileUpload } from "@/components/shared/FileUpload";

export const Image = ({
	image,
	handleImageUpload,
	handleImageDelete,
	handleSubmit,
	error,
}: ImageProps) => {
	return (
		<>
			<h2 className="text-center text-xl text-midnight md:text-3xl">Image</h2>

			<div className="mx-auto w-full max-w-xl">
				<FileUpload
					onChange={handleImageUpload}
					onDelete={handleImageDelete}
					files={image ? [image] : []}
					isImageUpload
				/>
			</div>
			<div className="mx-auto flex w-full max-w-xl justify-center">
				{error && <p className="text-center text-red-500">{error}</p>}
				<button
					type="submit"
					className="mt-6 rounded-md bg-midnight px-8 py-3 text-white"
					onClick={handleSubmit}
				>
					Submit
				</button>
			</div>
		</>
	);
};
