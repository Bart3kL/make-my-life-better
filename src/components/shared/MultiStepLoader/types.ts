import { LoadingState } from "./LoaderCore/types";

export interface MultiStepLoaderProps {
	loadingStates: LoadingState[];
	loading?: boolean;
	duration?: number;
	loop?: boolean;
}
