"use client";

import { SignupForm } from "@/components/authPages/SignupForm";
import { motion } from "framer-motion";

export default function SignUpPage() {
	return (
		<>
			<motion.div
				initial={{ opacity: 0.5, y: 100 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{
					delay: 0.3,
					duration: 0.8,
					ease: "easeInOut",
				}}
			>
				<h1 className="mb-24 mt-80 bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text py-4 text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
					Sign Up
				</h1>
				<SignupForm />
			</motion.div>
		</>
	);
}
