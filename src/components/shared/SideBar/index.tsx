"use client";
import React, { useState } from "react";

import { TbUserCircle } from "react-icons/tb";

import { SidebarProvider } from "./SidebarProvider";
import { SidebarBody } from "./SidebarBody";
import { SidebarLink } from "./SidebarBody/SlidebarLink";
import { Logo } from "./SidebarBody/Logo";
import { LogoIcon } from "./SidebarBody/LogoIcon";

import { cn } from "@/lib/utils";
import { links } from "./constants";

export function Sidebar({ children }: { children: React.ReactNode }) {
	const [open, setOpen] = useState(false);
	return (
		<div
			className={cn(
				"border-paleLavender bg-white-2 flex w-full flex-1 flex-col overflow-hidden md:flex-row",
				"h-screen",
			)}
		>
			<SidebarProvider open={open} setOpen={setOpen}>
				<SidebarBody className="justify-between gap-10">
					<div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
						{open ? <Logo /> : <LogoIcon />}
						<div className="mt-8 flex flex-col gap-2">
							{links.map((link, idx) => (
								<SidebarLink key={idx} link={link} />
							))}
						</div>
					</div>
					<div>
						<SidebarLink
							className="[&>span]:text-lg"
							link={{
								label: "Bartosz Lewandowski",
								href: "/dashboard/profile",
								icon: (
									<TbUserCircle className="text-midnight h-8 w-8 flex-shrink-0" />
									// <Image
									// 	src="https://assets.aceternity.com/manu.png"
									// 	className="h-7 w-7 flex-shrink-0 rounded-full"
									// 	width={50}
									// 	height={50}
									// 	alt="Avatar"
									// />
								),
							}}
						/>
					</div>
				</SidebarBody>
			</SidebarProvider>
			<div className="flex flex-1">
				<div className="text-midnight m-2 flex w-full flex-1 flex-col gap-2 rounded-2xl border border-neutral-200 bg-white p-2 md:m-0 md:p-10">
					{children}
				</div>
			</div>
		</div>
	);
}

// Dummy dashboard component with content
