import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "store"
import { Note, FirebaseState } from "types"
import { showAlert } from "./alertSlice"

const url = process.env.REACT_APP_DB_URL

function withoutId(obj: Record<string, any>): Record<string, any> {
	const result: Record<string, any> = {}
	for (let key of Object.keys(obj)) {
		if ("id" !== key) {
			result[key] = obj[key]
		}
	}
	return result
}

type ThunkApi = {
	rejectValue: string
	state: RootState
}

export const fetchNotes = createAsyncThunk<{ notes: Note[] }, string, ThunkApi>(
	"firebase/fetchNotes",
	async (userId, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${url}/${userId}/notes.json`)

			if (response.statusText !== "OK") throw new Error("Server Error")

			if (!response.data) return { notes: [] }

			const notes = Object.keys(response.data)
				.map((key) => ({
					...response.data[key],
					id: key,
				}))
				.sort((a, b) => {
					return a.order - b.order
				})

			return { notes }
		} catch (error) {
			return rejectWithValue((error as Error).message)
		}
	}
)

export const removeNote = createAsyncThunk<
	string,
	{
		userId: string
		noteId: string
	},
	ThunkApi
>("firebase/removeNote", ({ userId, noteId }, { rejectWithValue }) => {
	try {
		axios.delete(`${url}/${userId}/notes/${noteId}.json`)

		return noteId
	} catch (error) {
		return rejectWithValue((error as Error).message)
	}
})

export const disableNote = createAsyncThunk<
	string,
	{
		userId: string
		noteId: string
	},
	ThunkApi
>("firebase/disableNote", async ({ userId, noteId }, { getState, rejectWithValue, dispatch }) => {
	try {
		const { notes } = getState().firebase

		const data = withoutId({
			...notes.filter((el) => el.id === noteId)[0],
			isDisable: !notes.filter((el) => el.id === noteId)[0].isDisable,
			isImportant: false,
		})

		const response = await axios.put(`${url}/${userId}/notes/${noteId}.json`, data)

		if (response.statusText !== "OK") {
			throw new Error("Server Error")
		} else {
			return noteId
		}
	} catch (error) {
		dispatch(showAlert({ text: (error as Error).message, type: "danger" }))
		return rejectWithValue((error as Error).message)
	}
})

export const importantNote = createAsyncThunk<
	string,
	{
		userId: string
		noteId: string
	},
	ThunkApi
>("firebase/importantNote", async ({ userId, noteId }, { getState, rejectWithValue, dispatch }) => {
	try {
		const { notes } = getState().firebase

		const data = withoutId({
			...notes.filter((el) => el.id === noteId)[0],
			isImportant: !notes.filter((el) => el.id === noteId)[0].isImportant,
			isDisable: false,
		})

		const response = await axios.put(`${url}/${userId}/notes/${noteId}.json`, data)

		if (response.statusText !== "OK") {
			throw new Error("Server Error")
		} else {
			return noteId
		}
	} catch (error) {
		dispatch(showAlert({ text: (error as Error).message, type: "danger" }))
		return rejectWithValue((error as Error).message)
	}
})

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
	"firebase/setContent",
	async ({ content, noteId, userId }, { getState, rejectWithValue, dispatch }) => {
		try {
			const { notes } = getState().firebase

			const data = withoutId({
				...notes.filter((el) => el.id === noteId)[0],
				content,
			})

			const response = await axios.put(`${url}/${userId}/notes/${noteId}.json`, data)

			if (response.statusText !== "OK") {
				throw new Error("Server Error")
			} else {
				return { noteId, content }
			}
		} catch (error) {
			dispatch(showAlert({ text: (error as Error).message, type: "danger" }))
			return rejectWithValue((error as Error).message)
		}
	}
)

export const sortNotes = createAsyncThunk<void, { notes: Note[]; userId: string }, ThunkApi>(
	"firebase/sortNotes",
	({ notes, userId }, { dispatch, getState }) => {
		const data = notes.map((note: Note, i: number) => ({ ...note, order: i }))
		const prevNotes = getState().firebase.notes

		data.forEach((note: Note) => {
			if (note.order !== prevNotes.filter((el) => el.id === note.id)[0].order)
				axios.put(`${url}/${userId}/notes/${note.id}.json`, withoutId(note))
		})

		dispatch(setNotes({ notes: data }))
	}
)

export const addNote = createAsyncThunk<
	Note,
	{ title: string; isImportant: boolean },
	{ state: RootState }
>("firebase/addNote", async ({ title, isImportant }, { getState, rejectWithValue }) => {
	const { notes } = getState().firebase
	const { id } = getState().user.user

	try {
		const note: Note = {
			title,
			date: new Date().toLocaleString(),
			isImportant,
			isDisable: false,
			order: notes.length,
		}

		const response = await axios.post(`${url}/${id}/notes.json`, note)

		if (response.statusText !== "OK") throw new Error("Server Error")

		const newNote = {
			id: response.data.name,
			...note,
		}

		return newNote
	} catch (error) {
		return rejectWithValue((error as Error).message)
	}
})

const initialState: FirebaseState = {
	notes: [],
	loading: false,
	filter: "active",
	error: {
		get: null,
		update: null,
	},
}

const firebaseSlice = createSlice({
	name: "firebase",
	initialState,
	reducers: {
		clearNotes(state) {
			state.notes = []
		},
		setNotes(state, action) {
			state.notes = action.payload.notes
		},
		changeFilter(state, action) {
			state.filter = action.payload.filter
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchNotes.pending, (state) => {
				state.loading = true
				state.error.get = null
				state.error.update = null
			})
			.addCase(fetchNotes.fulfilled, (state, action) => {
				state.notes = action.payload!.notes
				state.loading = false
				state.error.get = null
				state.error.update = null
			})
			.addCase(fetchNotes.rejected, (state, action: { payload: any }) => {
				state.loading = false
				state.error.get = action.payload
				state.error.update = null
			})
			.addCase(removeNote.fulfilled, (state, action) => {
				state.notes = state.notes
					.filter((note) => note.id !== action.payload)
					.map((note, i) => ({ ...note, order: i }))
				state.error.update = null
				state.error.get = null
			})
			.addCase(removeNote.rejected, (state, action: { payload: any }) => {
				state.error.update = action.payload
				state.error.get = null
			})
			.addCase(disableNote.fulfilled, (state, action) => {
				state.notes = state.notes.map((note) => {
					if (note.id === action.payload)
						return { ...note, isDisable: !note.isDisable, isImportant: false }
					return note
				})
				state.error.update = null
				state.error.get = null
			})
			.addCase(disableNote.rejected, (state, action: { payload: any }) => {
				state.error.update = action.payload
				state.error.get = null
			})
			.addCase(importantNote.fulfilled, (state, action) => {
				state.notes = state.notes.map((note) => {
					if (note.id === action.payload)
						return { ...note, isImportant: !note.isImportant, isDisable: false }
					return note
				})
				state.error.update = null
				state.error.get = null
			})
			.addCase(importantNote.rejected, (state, action: { payload: any }) => {
				state.error.update = action.payload
			})
			.addCase(addNote.fulfilled, (state, action) => {
				state.notes.push(action.payload)
				state.error.update = null
				state.error.get = null
			})
			.addCase(addNote.rejected, (state, action: { payload: any }) => {
				state.error.update = action.payload
				state.error.get = null
			})
			.addCase(setContent.fulfilled, (state, action) => {
				state.notes = state.notes.map((note) => {
					if (note.id === action.payload.noteId) return { ...note, content: action.payload.content }

					return note
				})
				state.error.update = null
				state.error.get = null
			})
			.addCase(setContent.rejected, (state, action: { payload: any }) => {
				state.error.update = action.payload
			})
	},
})

export const { clearNotes, setNotes, changeFilter } = firebaseSlice.actions
export default firebaseSlice.reducer
