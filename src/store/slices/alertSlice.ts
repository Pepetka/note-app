import { createSlice } from "@reduxjs/toolkit"

type AlertType = "success" | "warning" | "danger"

interface AlertState {
	text: string
	type: AlertType
	visible: boolean
}

const initialState: AlertState = {
	text: "",
	type: "danger",
	visible: false,
}

const alertSlice = createSlice({
	name: "alert",
	initialState,
	reducers: {
		showAlert(state, action) {
			state.text = action.payload.text
			state.type = action.payload.type
			state.visible = true
		},
		hideAlert(state) {
			state.text = ""
			state.type = "danger"
			state.visible = false
		},
	},
})

export const { showAlert, hideAlert } = alertSlice.actions
export default alertSlice.reducer
