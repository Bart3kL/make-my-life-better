import Link from "next/link";

import { SocialLink } from "./SocialLink";
import { TypewriterEffectSmooth } from "@/components/shared/TypewriterEffectSmooth";
import { Sparkles } from "@/components/shared/Sparkles";

import { links, headingWords } from "./constants";

export function Hero() {
	return (
		<div className="relative h-screen w-screen overflow-hidden p-5">
			<div className="relative top-[13%] z-20 mx-auto max-w-2xl">
				<div className="flex flex-col items-center justify-center">
					<TypewriterEffectSmooth words={headingWords} />
					<p className="mb-10 text-center text-xs text-neutral-600 sm:text-base dark:text-neutral-200">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. consectetur adipisicing elit.
						consectetur adipisicing elit.
					</p>
					<div className="flex flex-col space-x-0 space-y-4 md:flex-row md:space-x-4 md:space-y-0">
						<button className="h-10 w-40 rounded-xl border border-transparent bg-black text-sm text-white dark:border-white">
							<Link href="/signup" className="flex h-full w-full items-center justify-center">
								Join now
							</Link>
						</button>
						<button className="h-10 w-40 rounded-xl border border-black bg-white text-sm text-black">
							<Link href="/signin" className="flex h-full w-full items-center justify-center">
								Sign in
							</Link>
						</button>
					</div>
				</div>
			</div>

			<div className="absolute bottom-0 left-1/2 z-10 flex w-full translate-x-[-50%] transform flex-wrap justify-center gap-8 p-12 pt-5 sm:flex-row">
				{links.map((link) => (
					<SocialLink key={link.title} {...link} />
				))}
			</div>

			<div className="relative -mt-20 h-[33rem] overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#8350e8,transparent_70%)] before:opacity-40 after:absolute after:-left-1/2 after:top-1/2 after:aspect-[1/0.7] after:min-h-24 after:w-[200%] after:rounded-[100%] after:border-t after:border-[#7876c566] after:bg-zinc-900 sm:-mt-0">
				<Sparkles
					density={1200}
					className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
				/>
			</div>
		</div>
	);
}
