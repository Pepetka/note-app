import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {child, get, ref} from 'firebase/database';
import axios from 'axios';
import {alertActions} from '../../alert/slice/alertSlice';
import {database} from '../../../firebase';
import {withoutId} from 'helpers/withoutId/withoutId';
import {Note, NotesSchema} from '../types/NotesSchema';
import {StateSchema} from '../../types/StateSchema';

const url = process.env.REACT_APP_DB_URL;

type ThunkApi = {
	rejectValue: string
	fulfillValue: string
	state: StateSchema
}

export enum FilterTypes {
	ALL = 'all',
	DISABLE = 'isDisable',
	IMPORTANT = 'isImportant',
	ACTIVE = 'active'
}

export const fetchNotes = createAsyncThunk<Note[], string, ThunkApi>(
	'notes/fetchNotes',
	async (userId, {rejectWithValue}) => {
		try {
			const dbRef = ref(database);
			const response: { exists: () => boolean; val: () => { [id: string]: Note } } = await get(
				child(dbRef, `notes/${userId}`),
			);

			if (response.exists()) {
				const notes: Note[] = Object.entries(response.val()).map((el) => ({...el[1], id: el[0]}));

				return notes.sort((a, b) => a.order - b.order);
			} else {
				return [];
			}
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	},
);

export const removeNote = createAsyncThunk<
	string,
	{
		userId: string
		noteId: string
	},
	ThunkApi
>('notes/removeNote', ({userId, noteId}, {rejectWithValue}) => {
	try {
		axios.delete(`${url}/notes/${userId}/${noteId}.json`);

		return noteId;
	} catch (error) {
		return rejectWithValue((error as Error).message);
	}
});

export const disableNote = createAsyncThunk<
	string,
	{
		userId: string
		noteId: string
	},
	ThunkApi
>('notes/disableNote', async ({userId, noteId}, {getState, rejectWithValue, dispatch}) => {
	try {
		const {notes} = getState().notes;

		const data = withoutId({
			...notes.filter((el) => el.id === noteId)[0],
			isDisable: !notes.filter((el) => el.id === noteId)[0].isDisable,
			isImportant: false,
		});

		const response = await axios.put(`${url}/notes/${userId}/${noteId}.json`, data);

		if (response.statusText !== 'OK') {
			throw new Error('Server Error');
		} else {
			return noteId;
		}
	} catch (error) {
		dispatch(alertActions.showAlert({text: (error as Error).message, type: 'danger'}));
		return rejectWithValue((error as Error).message);
	}
});

export const importantNote = createAsyncThunk<
	string,
	{
		userId: string
		noteId: string
	},
	ThunkApi
>('notes/importantNote', async ({userId, noteId}, {getState, rejectWithValue, dispatch}) => {
	try {
		const {notes} = getState().notes;

		const data = withoutId({
			...notes.filter((el) => el.id === noteId)[0],
			isImportant: !notes.filter((el) => el.id === noteId)[0].isImportant,
			isDisable: false,
		});

		const response = await axios.put(`${url}/notes/${userId}/${noteId}.json`, data);

		if (response.statusText !== 'OK') {
			throw new Error('Server Error');
		} else {
			return noteId;
		}
	} catch (error) {
		dispatch(alertActions.showAlert({text: (error as Error).message, type: 'danger'}));
		return rejectWithValue((error as Error).message);
	}
});

export const setContent = createAsyncThunk<
	{
		noteId: string
		content: string
	},
	{
		content: string
		userId: string
		noteId: string
	},
	ThunkApi
>(
	'notes/setContent',
	async ({content, noteId, userId}, {getState, rejectWithValue, dispatch}) => {
		try {
			const {notes} = getState().notes;

			const data = withoutId({
				...notes.filter((el) => el.id === noteId)[0],
				content,
			});

			const response = await axios.put(`${url}/notes/${userId}/${noteId}.json`, data);

			if (response.statusText !== 'OK') {
				throw new Error('Server Error');
			} else {
				return {noteId, content};
			}
		} catch (error) {
			dispatch(alertActions.showAlert({text: (error as Error).message, type: 'danger'}));
			return rejectWithValue((error as Error).message);
		}
	},
);

export const sortNotes = createAsyncThunk<void, { notes: Note[]; userId: string }, ThunkApi>(
	'notes/sortNotes',
	({notes, userId}, {dispatch, getState}) => {
		const data = notes.map((note: Note, i: number) => ({...note, order: i}));
		const prevNotes = getState().notes.notes;

		data.forEach((note: Note) => {
			if (note.order !== prevNotes.filter((el) => el.id === note.id)[0].order) {
				axios.put(`${url}/notes/${userId}/${note.id}.json`, withoutId(note));
			}
		});

		dispatch(notesActions.setNotes({notes: data}));
	},
);

export const addNote = createAsyncThunk<
	Note,
	{ title: string; isImportant: boolean },
	{ state: StateSchema }
>('notes/addNote', async ({title, isImportant}, {getState, rejectWithValue}) => {
	const {notes} = getState().notes;
	const {id} = getState().user.user;

	try {
		const note: Note = {
			title,
			date: new Date().toLocaleString(),
			isImportant,
			isDisable: false,
			order: notes.length,
		};

		const response = await axios.post(`${url}/notes/${id}.json`, note);

		if (response.statusText !== 'OK') throw new Error('Server Error');

		const newNote = {
			id: response.data.name,
			...note,
		};

		return newNote;
	} catch (error) {
		return rejectWithValue((error as Error).message);
	}
});

const initialState: NotesSchema = {
	notes: [],
	loading: false,
	filter: FilterTypes.ACTIVE,
	error: {
		get: null,
		update: null,
	},
};

const notesSlice = createSlice({
	name: 'notes',
	initialState,
	reducers: {
		clearNotes(state) {
			state.notes = [];
		},
		setNotes(state, action) {
			state.notes = action.payload.notes;
		},
		changeFilter(state, action) {
			state.filter = action.payload.filter;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchNotes.pending, (state) => {
				state.loading = true;
				state.error.get = null;
				state.error.update = null;
			})
			.addCase(fetchNotes.fulfilled, (state, action) => {
				state.notes = action.payload;
				state.loading = false;
				state.error.get = null;
				state.error.update = null;
			})
			.addCase(fetchNotes.rejected, (state, action: { payload: any }) => {
				state.loading = false;
				state.error.get = action.payload;
				state.error.update = null;
			})
			.addCase(removeNote.fulfilled, (state, action) => {
				state.notes = state.notes
					.filter((note) => note.id !== action.payload)
					.map((note, i) => ({...note, order: i}));
				state.error.update = null;
				state.error.get = null;
			})
			.addCase(removeNote.rejected, (state, action: { payload: any }) => {
				state.error.update = action.payload;
				state.error.get = null;
			})
			.addCase(disableNote.fulfilled, (state, action) => {
				state.notes = state.notes.map((note) => {
					if (note.id === action.payload) {
						return {...note, isDisable: !note.isDisable, isImportant: false};
					}
					return note;
				});
				state.error.update = null;
				state.error.get = null;
			})
			.addCase(disableNote.rejected, (state, action: { payload: any }) => {
				state.error.update = action.payload;
				state.error.get = null;
			})
			.addCase(importantNote.fulfilled, (state, action) => {
				state.notes = state.notes.map((note) => {
					if (note.id === action.payload) {
						return {...note, isImportant: !note.isImportant, isDisable: false};
					}
					return note;
				});
				state.error.update = null;
				state.error.get = null;
			})
			.addCase(importantNote.rejected, (state, action: { payload: any }) => {
				state.error.update = action.payload;
			})
			.addCase(addNote.fulfilled, (state, action) => {
				state.notes.push(action.payload);
				state.error.update = null;
				state.error.get = null;
			})
			.addCase(addNote.rejected, (state, action: { payload: any }) => {
				state.error.update = action.payload;
				state.error.get = null;
			})
			.addCase(setContent.fulfilled, (state, action) => {
				state.notes = state.notes.map((note) => {
					if (note.id === action.payload.noteId) return {...note, content: action.payload.content};

					return note;
				});
				state.error.update = null;
				state.error.get = null;
			})
			.addCase(setContent.rejected, (state, action: { payload: any }) => {
				state.error.update = action.payload;
			});
	},
});

export const notesActions = notesSlice.actions;
export default notesSlice.reducer;
