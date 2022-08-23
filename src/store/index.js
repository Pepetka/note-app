import { configureStore } from "@reduxjs/toolkit"
import alertReducer from "./slices/alertSlice"
import firebaseReducer from "./slices/firebaseSlice"

export const store = configureStore({
	reducer: {
		alert: alertReducer,
		firebase: firebaseReducer,
	},
})
