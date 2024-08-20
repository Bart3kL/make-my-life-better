import { ShootingStarsAndStarsBackgroundDemo } from "@/components/authPages/ShootingStarsAndStarsBackground";

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <ShootingStarsAndStarsBackgroundDemo>{children}</ShootingStarsAndStarsBackgroundDemo>;
}
