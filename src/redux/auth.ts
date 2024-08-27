import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type UserProps } from "@/components/shared/GetCurrentUser/types";

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
		setAuthStatus: (state, action: PayloadAction<boolean>) => {
			state.authStatus = action.payload;
		},

		setUser: (state, action: PayloadAction<UserProps | null>) => {
			state.user = action.payload;
		},
	},
});

export const { setAuthStatus, setUser } = authSlice.actions;
// eslint-disable-next-line import/no-default-export
export default authSlice.reducer;
