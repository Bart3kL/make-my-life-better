import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import jwt from "jsonwebtoken";
import { Providers } from "../components/shared/Providers";
import GetCurrentUser from "@/components/shared/GetCurrentUser";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Make my life better",
	description: "",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const cookiesList = cookies();
	const token = cookiesList.has("auth-token");

	return (
		<Providers>
			{token && <GetCurrentUser />}
			<html lang="en">
				<body className={inter.className}>
					{children} <div id="portal-root"></div>
				</body>
			</html>
		</Providers>
	);
}
