import { useEffect, useRef, useState, useCallback } from "react";

export const usePlaceholderAnimation = (placeholders: string[]) => {
	const [currentPlaceholder, setCurrentPlaceholder] = useState(0);

	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const startAnimation = () => {
		intervalRef.current = setInterval(() => {
			setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
		}, 3000);
	};
	const handleVisibilityChange = () => {
		if (document.visibilityState !== "visible" && intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		} else if (document.visibilityState === "visible") {
			startAnimation();
		}
	};

	useEffect(() => {
		startAnimation();
		document.addEventListener("visibilitychange", handleVisibilityChange);

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, [placeholders]);

	return { currentPlaceholder };
};

export const useCanvasDraw = (
	value: string,
	setValue: (val: string) => void,
	setAnimating: (val: boolean) => void,
	inputRef: React.RefObject<HTMLInputElement>,
) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const newDataRef = useRef<any[]>([]);

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
		const newData: any[] = [];

		for (let t = 0; t < 800; t++) {
			let i = 4 * t * 800;
			for (let n = 0; n < 800; n++) {
				let e = i + 4 * n;
				if (pixelData[e] !== 0 && pixelData[e + 1] !== 0 && pixelData[e + 2] !== 0) {
					newData.push({
						x: n,
						y: t,
						color: [pixelData[e], pixelData[e + 1], pixelData[e + 2], pixelData[e + 3]],
					});
				}
			}
		}

		newDataRef.current = newData.map(({ x, y, color }) => ({
			x,
			y,
			r: 1,
			color: `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`,
		}));
	}, [value]);

	const animate = (start: number) => {
		const animateFrame = (pos: number = 0) => {
			requestAnimationFrame(() => {
				const newArr = [];
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
					newDataRef.current.forEach((t) => {
						const { x: n, y: i, r: s, color: color } = t;
						if (n > pos) {
							ctx.beginPath();
							ctx.rect(n, i, s, s);
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
				}
			});
		};
		animateFrame(start);
	};

	const vanishAndSubmit = () => {
		setAnimating(true);
		draw();

		const value = inputRef.current?.value || "";
		if (value && inputRef.current) {
			const maxX = newDataRef.current.reduce(
				(prev, current) => (current.x > prev ? current.x : prev),
				0,
			);
			animate(maxX);
		}
	};

	return { canvasRef, draw, animate, vanishAndSubmit };
};
