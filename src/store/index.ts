import { configureStore } from "@reduxjs/toolkit"
import alertReducer from "./slices/alertSlice"
import firebaseReducer from "./slices/firebaseSlice"
import userReducer from "./slices/userSlice"

export const store = configureStore({
	reducer: {
		alert: alertReducer,
		firebase: firebaseReducer,
		user: userReducer,
	},
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
