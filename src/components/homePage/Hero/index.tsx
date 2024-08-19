import { Sparkles } from "@/components/shared/Sparkles";
import { Link } from "./Link";

import { links } from "./constants";

export function Hero() {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="mx-auto mt-32 w-screen max-w-2xl">
        <div className="text-center text-3xl text-white">ssss</div>
      </div>

      <div className="relative top-32 z-10 flex flex-wrap justify-center gap-8 mt-14 m-6 sm:flex-row">
        {links.map((link) => (
          <Link key={link.title} {...link} />
        ))}
      </div>

      <div className="relative -mt-32 h-96 w-screen overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#8350e8,transparent_70%)] before:opacity-40 after:absolute after:-left-1/2 after:top-1/2 after:aspect-[1/0.7] after:w-[200%] after:rounded-[100%] after:border-t after:border-[#7876c566] after:bg-zinc-900">
        <Sparkles
          density={1200}
          className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
        />
      </div>
    </div>
  );
}
