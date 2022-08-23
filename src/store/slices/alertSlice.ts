import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	text: "",
	type: "",
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
			state.type = ""
			state.visible = false
		},
	},
})

export const { showAlert, hideAlert } = alertSlice.actions
export default alertSlice.reducer
