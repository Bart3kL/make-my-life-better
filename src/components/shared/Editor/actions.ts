import { BlogState, BlogAction } from "./types";

export const initialState: BlogState = {
	title: "",
	url: "",
	postType: "",
	imageFile: null,
	isMounted: false,
	isSubmitting: false,
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
		case "SET_IS_SUBMITTING":
			return { ...state, isSubmitting: action.isSubmitting };
		case "RESET_FORM":
			return initialState;
		default:
			return state;
	}
};
