"use client";

import React, { useState } from "react";
import { TbUserCircle } from "react-icons/tb";

import { SidebarProvider } from "./SidebarProvider";
import { SidebarBody } from "./SidebarBody";
import { SidebarLink } from "./SidebarBody/SlidebarLink";
import { Logo } from "./SidebarBody/Logo";
import { LogoIcon } from "./SidebarBody/LogoIcon";

import { links } from "./constants";
import { useAppSelector, type RootState } from "@/redux/store";
import { type UserProps } from "@/components/shared/GetCurrentUser/types";

export function Sidebar({ children }: { children: React.ReactNode }) {
	const [open, setOpen] = useState(false);

	const user = useAppSelector((state: RootState) => state.auth.user) as { user: UserProps } | null;

	const me = user?.user;

	return (
		<div
			className={
				"flex h-full min-h-screen w-full flex-1 flex-col overflow-hidden border-paleLavender bg-white-2 md:flex-row"
			}
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
							loading={!me}
							className="[&>span]:text-lg"
							link={{
								activeLink: ["/profile"],
								label: `${me?.firstname} ${me?.lastname}`,
								href: "/profile",
								icon: <TbUserCircle className="h-8 w-8 flex-shrink-0 text-midnight" />,
							}}
						/>
					</div>
				</SidebarBody>
			</SidebarProvider>
			<div className="flex h-full flex-1">
				<div className="m-2 flex h-full w-full flex-1 flex-col gap-2 overflow-auto rounded-2xl border border-neutral-200 bg-white-2 p-2 text-midnight md:m-0 md:p-10">
					{children}
				</div>
			</div>
		</div>
	);
}
