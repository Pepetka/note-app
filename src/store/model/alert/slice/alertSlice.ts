import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AlertSchema, AlertType} from '../types/AlertSchema';

const initialState: AlertSchema = {
	text: '',
	type: 'danger',
	visible: false,
};

const alertSlice = createSlice({
	name: 'alert',
	initialState,
	reducers: {
		showAlert(state, action: PayloadAction<{text: string, type: AlertType}>) {
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
export const alertReducer = alertSlice.reducer;
