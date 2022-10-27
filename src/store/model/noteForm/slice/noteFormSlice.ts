import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NoteFormSchema} from '../types/NoteFormSchema';

const initialState: NoteFormSchema = {
	noteContent: '',
	noteTitle: '',
};

const noteFormSlice = createSlice({
	name: 'noteForm',
	initialState,
	reducers: {
		setTitle(state, action: PayloadAction<string>) {
			state.noteTitle = action.payload;
			state.error = undefined;
		},
		setContent(state, action: PayloadAction<string>) {
			state.noteContent = action.payload;
			state.error = undefined;
		},
		setError(state, action: PayloadAction<string>) {
			state.error = action.payload;
		},
	},
});

export const noteFormActions = noteFormSlice.actions;
export const noteFormReducer = noteFormSlice.reducer;
