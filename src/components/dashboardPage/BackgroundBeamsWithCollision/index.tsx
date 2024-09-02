"use client";

import React, { useRef } from "react";

import { beams } from "./constants";
import { CollisionMechanism } from "@/components/dashboardPage/BackgroundBeamsWithCollision/CollisionMechanism";

import { cn } from "@/lib/utils";

export const BackgroundBeamsWithCollision = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const parentRef = useRef<HTMLDivElement>(null);

	return (
		<div
			ref={parentRef}
			className={cn(
				"relative flex h-64 w-full items-center justify-center overflow-hidden bg-gradient-to-b md:h-[40rem]",
				className,
			)}
		>
			{beams.map((beam) => (
				<CollisionMechanism
					key={beam.initialX + "beam-idx"}
					beamOptions={beam}
					containerRef={containerRef}
					parentRef={parentRef}
				/>
			))}

			{children}
			<div
				ref={containerRef}
				className="pointer-events-none absolute inset-x-0 bottom-0 w-full"
				style={{
					boxShadow:
						"0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset",
				}}
			></div>
		</div>
	);
};
