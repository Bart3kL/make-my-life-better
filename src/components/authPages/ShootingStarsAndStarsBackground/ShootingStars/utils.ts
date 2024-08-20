export const getRandomStartPoint = () => {
	const side = Math.floor(Math.random() * 4);
	const offset = Math.random() * window.innerWidth;

	switch (side) {
		case 0:
			return { x: offset, y: 0, angle: 45 };
		case 1:
			return { x: window.innerWidth, y: offset, angle: 135 };
		case 2:
			return { x: offset, y: window.innerHeight, angle: 225 };
		case 3:
			return { x: 0, y: offset, angle: 315 };
		default:
			return { x: 0, y: 0, angle: 45 };
	}
};
