import { type BlogState, type BlogAction } from "./types";

export const initialState: BlogState = {
	title: "",
	url: "",
	postType: "",
	imageFile: null,
	isMounted: false,
	loading: false,
};

export const blogReducer = (state: BlogState, action: BlogAction): BlogState => {
	switch (action.type) {
		case "SET_FIELD":
			return { ...state, [action.field]: action.value };
		case "UPLOAD_FILES":
			return { ...state, imageFile: action.payload };
		case "DELETE_FILE":
			return {
				...state,
				imageFile: null,
			};

		case "RESET_FORM":
			return initialState;
		case "SET_LOADING":
			return { ...state, loading: action.loading };
		default:
			return state;
	}
};
