"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { Portal } from "@mui/material";

import { type ExpandableCardsProps } from "./types";
import { useOutsideClick } from "./hooks";
import { Item } from "@/components/shared/ExpandableCards/Item";

export function ExpandableCards({ cards, isContentPage }: ExpandableCardsProps) {
	const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(null);
	const ref = useRef<HTMLDivElement>(null);
	const id = useId();

	useEffect(() => {
		function onKeyDown(event: KeyboardEvent) {
			if (event.key === "Escape") {
				setActive(false);
			}
		}

		if (active && typeof active === "object") {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}

		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [active]);

	useOutsideClick(ref, () => setActive(null));

	return (
		<>
			<Portal>
				<AnimatePresence>
					{active && typeof active === "object" && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="fixed inset-0 z-10 h-full w-full bg-black/20"
						/>
					)}
				</AnimatePresence>
				<AnimatePresence>
					{active && typeof active === "object" ? (
						<div className="fixed inset-0 z-[100] grid place-items-center">
							<motion.button
								key={`button-${active.title}-${id}`}
								layout
								initial={{
									opacity: 0,
								}}
								animate={{
									opacity: 1,
								}}
								exit={{
									opacity: 0,
									transition: {
										duration: 0.05,
									},
								}}
								className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white lg:hidden"
								onClick={() => setActive(null)}
							>
								<IoClose className="text-midnight" />
							</motion.button>
							<motion.div
								layoutId={`card-${active.title}-${id}`}
								ref={ref}
								className="flex h-full w-full max-w-[500px] flex-col overflow-hidden bg-white sm:rounded-3xl md:h-fit md:max-h-[90%] dark:bg-neutral-900"
							>
								<motion.div layoutId={`image-${active.title}-${id}`}>
									<Image
										priority
										width={200}
										height={200}
										src={active.src}
										alt={active.title}
										className="h-80 w-full object-cover object-top sm:rounded-tl-lg sm:rounded-tr-lg lg:h-80"
									/>
								</motion.div>

								<div className="overflow-auto">
									<div className="flex items-start justify-between p-4">
										<div className="">
											<motion.h3
												layoutId={`title-${active.title}-${id}`}
												className="font-bold text-neutral-700 dark:text-neutral-200"
											>
												{active.title}
											</motion.h3>
											<motion.p
												layoutId={`createdat-${active.createdat}-${active.title}-${id}`}
												className="text-neutral-600 dark:text-neutral-400"
											>
												{active.createdat}
											</motion.p>
										</div>

										<motion.a
											layoutId={`button-${active.title}-${id}`}
											href={active.link}
											className="rounded-full bg-green-500 px-4 py-3 text-sm font-bold text-white"
										>
											{isContentPage ? "Add  content" : "Check structure"}
										</motion.a>
									</div>
									<div className="relative px-4 pt-4">
										<motion.div
											layout
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
											className="flex h-40 flex-col items-start gap-4 overflow-auto pb-10 text-xs text-neutral-600 [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] md:h-fit md:text-sm lg:text-base dark:text-neutral-400"
										>
											{isContentPage
												? Array.isArray(active.headings)
													? active.headings.map((heading: string) => <p key={heading}>{heading}</p>)
													: active.headings.blocks.map((heading: { data: { text: string } }) => (
															<p key={heading.data.text}>{heading.data.text}</p>
														))
												: Array.isArray(active.headings)
													? active.headings.map((heading: string) => <p key={heading}>{heading}</p>)
													: null}
										</motion.div>
									</div>
								</div>
							</motion.div>
						</div>
					) : null}
				</AnimatePresence>
			</Portal>
			<ul className="mx-auto w-full max-w-2xl gap-4">
				{cards.map((card) => (
					<Item
						card={card}
						key={card.title}
						id={id}
						setActive={setActive}
						isContentPage={isContentPage}
					/>
				))}
			</ul>
		</>
	);
}
