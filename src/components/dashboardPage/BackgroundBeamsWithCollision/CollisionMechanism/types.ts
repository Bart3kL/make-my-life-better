export interface CollisionMechanismProps {
	containerRef: React.RefObject<HTMLDivElement>;
	parentRef: React.RefObject<HTMLDivElement>;
	beamOptions?: {
		initialX?: number;
		translateX?: number;
		initialY?: number;
		translateY?: number;
		rotate?: number;
		className?: string;
		duration?: number;
		delay?: number;
		repeatDelay?: number;
	};
}
