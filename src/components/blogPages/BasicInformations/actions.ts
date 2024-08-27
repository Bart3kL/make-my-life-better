import { type BlogState, type BlogAction } from "./types";

export const initialState: BlogState = {
	step: 1,
	titleBlogPost: "",
	files: [],
	image: null,
	knowledgeText: "",
	knowledgeUrls: "",
	errors: {},
	isSubmitting: false,
};

export const blogReducer = (state: BlogState, action: BlogAction): BlogState => {
	switch (action.type) {
		case "SET_FIELD":
			return { ...state, [action.field]: action.value };
		case "UPLOAD_FILES":
			return { ...state, files: [...state.files, ...action.payload] };
		case "DELETE_FILE":
			return {
				...state,
				files: state.files.filter((file: any) => file !== action.payload),
			};
		case "UPLOAD_IMAGE":
			return { ...state, image: action.payload };
		case "DELETE_IMAGE":
			return { ...state, image: null };
		case "SET_ERRORS":
			return { ...state, errors: action.errors };
		case "SET_STEP":
			return { ...state, step: action.payload };
		case "SET_IS_SUBMITTING":
			return { ...state, isSubmitting: action.isSubmitting };
		case "RESET_FORM":
			return initialState;
		default:
			return state;
	}
};
