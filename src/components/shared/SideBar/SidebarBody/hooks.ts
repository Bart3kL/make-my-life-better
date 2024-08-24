import { createContext, useContext } from "react";

import { SidebarContextProps } from "./types";

const defaultValues = {
	open: true,
	setOpen: () => {},
	animate: true,
	setAnimate: () => {},
};

export const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const useSidebar = () => {
	const context = useContext(SidebarContext);
	if (!context) {
		throw new Error("useSidebar must be used within a SidebarProvider");
	}
	return context;
};
