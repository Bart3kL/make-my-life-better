import { useState } from "react";

import { SidebarContext } from "../SidebarBody/hooks";

import { SidebarProviderProps } from "./types";

export const SidebarProvider = ({
	children,
	open: openProp,
	setOpen: setOpenProp,
	animate = true,
}: SidebarProviderProps) => {
	const [openState, setOpenState] = useState(false);

	const open = openProp !== undefined ? openProp : openState;
	const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;
	return (
		<SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
			{children}
		</SidebarContext.Provider>
	);
};
