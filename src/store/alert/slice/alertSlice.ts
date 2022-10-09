import {createSlice} from '@reduxjs/toolkit';
import {AlertSchema} from '../types/AlertSchema';

const initialState: AlertSchema = {
	text: '',
	type: 'danger',
	visible: false,
};

const alertSlice = createSlice({
	name: 'alert',
	initialState,
	reducers: {
		showAlert(state, action) {
			state.text = action.payload.text;
			state.type = action.payload.type;
			state.visible = true;
		},
		hideAlert(state) {
			state.visible = false;
		},
	},
});

export const alertActions = alertSlice.actions;
export default alertSlice.reducer;
