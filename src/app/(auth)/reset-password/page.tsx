"use client";
import { motion } from "framer-motion";
import { Suspense } from "react";

import { ShootingStarsAndStarsBackground } from "@/components/authPages/ShootingStarsAndStarsBackground";
import { Form } from "@/components/authPages/Form";
import { Spinner } from "@/components/shared/Spinner";

export default function ResetPasswordPage() {
	return (
		<ShootingStarsAndStarsBackground>
			<motion.div
				initial={{ opacity: 0.5, y: 100 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{
					delay: 0.3,
					duration: 0.8,
					ease: "easeInOut",
				}}
				className="w-full"
			>
				<h1 className="mb-24 mt-80 bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text py-4 text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
					Enter new password
				</h1>
				<Suspense fallback={<Spinner />}>
					<Form isEnterNewPasswordPage />
				</Suspense>
			</motion.div>
		</ShootingStarsAndStarsBackground>
	);
}
