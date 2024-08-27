export interface OwnerState {
	value?: string | number;
	onChange?: (event: React.SyntheticEvent, value: string | number) => void;
	slotProps?: Record<string, unknown>;
	selected: boolean;
	disabled?: boolean;
	active?: boolean;
	highlighted?: boolean;
}

export interface RootSlotProps {
	className?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
}

export type SlotPropsResolver = (
	fn: ((args: OwnerState) => Partial<RootSlotProps>) | Partial<RootSlotProps> | undefined,
	args: OwnerState,
) => Partial<RootSlotProps>;
