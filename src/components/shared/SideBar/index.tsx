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
				"flex w-full flex-1 flex-col overflow-hidden border-paleLavender bg-white-2 md:flex-row",
				"h-full min-h-screen",
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
									<TbUserCircle className="h-8 w-8 flex-shrink-0 text-midnight" />
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
			<div className="flex h-full min-h-screen flex-1">
				<div className="m-2 flex h-full min-h-screen w-full flex-1 flex-col gap-2 rounded-2xl border border-neutral-200 bg-white-2 p-2 text-midnight md:m-0 md:p-10">
					{children}
				</div>
			</div>
		</div>
	);
}
