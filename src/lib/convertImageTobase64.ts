// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const convertImageToBase64 = (file: any) => {
	if (!file) return;

	return new Promise((resolve, reject) => {
		const fileReader = new FileReader();
		fileReader.readAsDataURL(file);
		fileReader.onload = () => {
			resolve(fileReader.result as string);
		};
		fileReader.onerror = (error) => {
			reject(error);
		};
	});
};
