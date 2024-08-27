import { useEffect, useRef, useState, useCallback } from "react";

import { type UseCanvasDrawProps, type PixelData } from "./types";

export const usePlaceholderAnimation = (placeholders: string[]) => {
	const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	const startAnimation = useCallback(() => {
		intervalRef.current = setInterval(() => {
			setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
		}, 3000);
	}, [placeholders.length]);

	const handleVisibilityChange = useCallback(() => {
		if (document.visibilityState !== "visible" && intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		} else if (document.visibilityState === "visible") {
			startAnimation();
		}
	}, [startAnimation]);

	useEffect(() => {
		startAnimation();
		document.addEventListener("visibilitychange", handleVisibilityChange);

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, [handleVisibilityChange, startAnimation]);

	return { currentPlaceholder };
};

export const useCanvasDraw = ({ value, setValue, setAnimating, inputRef }: UseCanvasDrawProps) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const newDataRef = useRef<PixelData[]>([]);

	const draw = useCallback(() => {
		if (!inputRef.current) return;
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		canvas.width = 800;
		canvas.height = 800;
		ctx.clearRect(0, 0, 800, 800);

		const computedStyles = getComputedStyle(inputRef.current);
		const fontSize = parseFloat(computedStyles.getPropertyValue("font-size"));
		ctx.font = `${fontSize * 2}px ${computedStyles.fontFamily}`;
		ctx.fillStyle = "#0e1c36";
		ctx.fillText(value, 16, 40);

		const imageData = ctx.getImageData(0, 0, 800, 800);
		const pixelData = imageData.data;
		const newData: PixelData[] = [];

		for (let t = 0; t < 800; t++) {
			const i = 4 * t * 800;
			for (let n = 0; n < 800; n++) {
				const e = i + 4 * n;
				if (pixelData[e] !== 0 || pixelData[e + 1] !== 0 || pixelData[e + 2] !== 0) {
					newData.push({
						x: n,
						y: t,
						color: `rgba(${pixelData[e]}, ${pixelData[e + 1]}, ${pixelData[e + 2]}, ${pixelData[e + 3] / 255})`,
						r: 1,
					});
				}
			}
		}

		newDataRef.current = newData;
	}, [value, inputRef]);

	const animate = (start: number, callback?: () => void) => {
		const animateFrame = (pos: number = 0) => {
			requestAnimationFrame(() => {
				const newArr: PixelData[] = [];

				for (let i = 0; i < newDataRef.current.length; i++) {
					const current = newDataRef.current[i];
					if (current.x < pos) {
						newArr.push(current);
					} else {
						if (current.r <= 0) {
							current.r = 0;
							continue;
						}
						current.x += Math.random() > 0.5 ? 1 : -1;
						current.y += Math.random() > 0.5 ? 1 : -1;
						current.r -= 0.05 * Math.random();
						newArr.push(current);
					}
				}

				newDataRef.current = newArr;

				const ctx = canvasRef.current?.getContext("2d");
				if (ctx) {
					ctx.clearRect(pos, 0, 800, 800);
					newDataRef.current.forEach(({ x, y, r, color }) => {
						if (x > pos) {
							ctx.beginPath();
							ctx.rect(x, y, r, r);
							ctx.fillStyle = color;
							ctx.strokeStyle = color;
							ctx.stroke();
						}
					});
				}

				if (newDataRef.current.length > 0) {
					animateFrame(pos - 8);
				} else {
					setValue("");
					setAnimating(false);
					if (callback) {
						callback();
					}
				}
			});
		};
		animateFrame(start);
	};

	const vanishAndSubmit = (callback: () => void) => {
		setAnimating(true);
		draw();

		const inputValue = inputRef.current?.value || "";
		if (inputValue) {
			const maxX = newDataRef.current.reduce((prev, { x }) => Math.max(prev, x), 0);
			animate(maxX, callback);
		}
	};

	return { canvasRef, draw, animate, vanishAndSubmit };
};
