import { cookies } from "next/headers";

import { Hero } from "@/components/homePage/Hero";

export default function Home() {
	return (
		<>
			<Hero />
		</>
	);
}
