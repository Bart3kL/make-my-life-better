import React from "react";
import { Tab as BaseTab, type TabProps } from "@mui/base/Tab";

import { type OwnerState, type SlotPropsResolver } from "./types";
import { cn } from "@/lib/utils";

const resolveSlotProps: SlotPropsResolver = (fn, args) => {
	if (typeof fn === "function") {
		return fn(args);
	}
	return fn ?? {};
};

export const Tab = React.forwardRef<HTMLButtonElement, TabProps>((props, ref) => (
	<BaseTab
		ref={ref}
		{...props}
		slotProps={{
			...props.slotProps,
			root: (ownerState: OwnerState) => {
				const resolvedSlotProps = resolveSlotProps(props.slotProps?.root, ownerState);
				return {
					...resolvedSlotProps,
					className: cn(
						`font-sans ${
							ownerState.selected
								? "text-white bg-blue-2"
								: "text-midnight bg-transparent focus:text-white"
						} ${
							ownerState.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
						} text-sm leading-[1.3] font-semibold w-full py-2.5 px-3 m-1.5 border-0 rounded-md flex justify-center focus:outline-0 focus:shadow-outline-purple-light focus:text-color`,
						resolvedSlotProps.className,
					),
				};
			},
		}}
	/>
));

Tab.displayName = "CustomTab";
