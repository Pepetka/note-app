import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {FilterTypes, Note, NotesSchema} from '../types/NotesSchema';
import {fetchNotes} from '../services/fetchNotes/fetchNotes';
import {disableNote} from '../services/disableNote/disableNote';
import {removeNote} from '../services/removeNote/removeNote';
import {importantNote} from '../services/importantNote/importantNote';
import {addNote} from '../services/addNote/addNote';
import {setContent} from '../services/setContent/setContent';

const initialState: NotesSchema = {
	notes: [],
	loading: false,
	filter: FilterTypes.ACTIVE,
	error: {},
};

const notesSlice = createSlice({
	name: 'notes',
	initialState,
	reducers: {
		clearNotes(state) {
			state.notes = [];
		},
		setNotes(state, action: PayloadAction<{ notes: Array<Note> }>) {
			state.notes = action.payload.notes;
		},
		changeFilter(state, action: PayloadAction<{filter: FilterTypes}>) {
			state.filter = action.payload.filter;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchNotes.pending, (state) => {
				state.loading = true;
				state.error = {};
			})
			.addCase(fetchNotes.fulfilled, (state, action) => {
				state.notes = action.payload;
				state.loading = false;
				state.error = {};
			})
			.addCase(fetchNotes.rejected, (state, action) => {
				state.loading = false;
				state.error.get = action.payload!;
				state.error.update = undefined;
			})
			.addCase(removeNote.fulfilled, (state, action) => {
				state.notes = state.notes
					.filter((note) => note.id !== action.payload)
					.map((note, i) => ({...note, order: i}));
				state.error = {};
			})
			.addCase(removeNote.rejected, (state, action) => {
				state.error.update = action.payload!;
				state.error.get = undefined;
			})
			.addCase(disableNote.fulfilled, (state, action) => {
				state.notes = state.notes.map((note) => {
					if (note.id === action.payload) {
						return {...note, isDisable: !note.isDisable, isImportant: false};
					}
					return note;
				});
				state.error = {};
			})
			.addCase(disableNote.rejected, (state, action) => {
				state.error.update = action.payload!;
				state.error.get = undefined;
			})
			.addCase(importantNote.fulfilled, (state, action) => {
				state.notes = state.notes.map((note) => {
					if (note.id === action.payload) {
						return {...note, isImportant: !note.isImportant, isDisable: false};
					}
					return note;
				});
				state.error = {};
			})
			.addCase(importantNote.rejected, (state, action) => {
				state.error.update = action.payload!;
			})
			.addCase(addNote.fulfilled, (state, action) => {
				state.notes.push(action.payload);
				state.error = {};
			})
			.addCase(addNote.rejected, (state, action) => {
				state.error.update = action.payload!;
				state.error.get = undefined;
			})
			.addCase(setContent.fulfilled, (state, action) => {
				state.notes = state.notes.map((note) => {
					if (note.id === action.payload.noteId) return {...note, content: action.payload.content};

					return note;
				});
				state.error = {};
			})
			.addCase(setContent.rejected, (state, action) => {
				state.error.update = action.payload!;
			});
	},
});

export const notesActions = notesSlice.actions;
export const notesReducer = notesSlice.reducer;
