import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

import { authSlice } from "./auth";

export const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
	},
});
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector = useSelector;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
