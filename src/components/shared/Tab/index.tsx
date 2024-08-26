import React from "react";
import { Tab as BaseTab, TabProps } from "@mui/base/Tab";

import { cn } from "@/lib/utils";

const resolveSlotProps = (fn: any, args: any) => (typeof fn === "function" ? fn(args) : fn);

export const Tab = React.forwardRef<HTMLButtonElement, TabProps>((props, ref) => {
	return (
		<BaseTab
			ref={ref}
			{...props}
			slotProps={{
				...props.slotProps,
				root: (ownerState) => {
					const resolvedSlotProps = resolveSlotProps(props.slotProps?.root, ownerState);
					return {
						...resolvedSlotProps,
						className: cn(
							`font-sans ${
								ownerState.selected
									? "text-white bg-blue-2"
									: "text-midnight bg-transparent focus:text-white  "
							} ${
								ownerState.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
							} text-sm leading-[1.3] font-semibold w-full py-2.5 px-3 m-1.5 border-0 rounded-md flex justify-center focus:outline-0 focus:shadow-outline-purple-light focus:text-color`,
							resolvedSlotProps?.className,
						),
					};
				},
			}}
		/>
	);
});
