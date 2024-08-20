export interface StarsBackgroundProps {
	starDensity?: number;
	allStarsTwinkle?: boolean;
	twinkleProbability?: number;
	minTwinkleSpeed?: number;
	maxTwinkleSpeed?: number;
	className?: string;
}

export interface StarProps {
	x: number;
	y: number;
	radius: number;
	opacity: number;
	twinkleSpeed: number | null;
}
