import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ReduxProvider } from "../components/shared/ReduxProvider";

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
	return (
		<ReduxProvider>
			<html lang="en">
				<body className={inter.className}>{children}</body>
			</html>
		</ReduxProvider>
	);
}
