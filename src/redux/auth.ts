import { type UserProps } from "@/components/shared/GetCurrentUser/types";
import { createSlice, configureStore } from "@reduxjs/toolkit";

type TInitialState = {
	user: UserProps | null;
	authStatus: boolean;
};

const initialState: TInitialState = {
	authStatus: false,
	user: null,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAuthStatus: (state, action) => {
			state.authStatus = action.payload;
		},

		setUser: (state, action) => {
			state.user = action.payload;
		},
	},
});

export const { setAuthStatus, setUser } = authSlice.actions;
export default authSlice.reducer;
