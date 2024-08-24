export type LoadingState = {
	text: string;
};

export interface LoaderCoreProps {
	loadingStates: LoadingState[];
	value?: number;
}
