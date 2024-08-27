export const convertImageToBase64 = (file: File): Promise<string> => {
	if (!file) {
		return Promise.reject(new Error("No file provided"));
	}

	return new Promise((resolve, reject) => {
		const fileReader = new FileReader();
		fileReader.readAsDataURL(file);

		fileReader.onload = () => {
			resolve(fileReader.result as string);
		};

		fileReader.onerror = () => {
			reject(new Error(`File reading failed: ${fileReader.error?.message || "unknown error"}`));
		};
	});
};
