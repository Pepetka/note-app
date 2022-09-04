import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { Note, FirebaseState } from "types"

const url = process.env.REACT_APP_DB_URL

export const fetchNotes = createAsyncThunk("firebase/fetchNotes", async (userId: string) => {
	const notes: Array<Note> = await axios.get(`${url}/${userId}/notes.json`).then((response) =>
		response.data
			? Object.keys(response.data)
					.map((key) => ({
						...response.data[key],
						id: key,
					}))
					.sort((a, b) => {
						if (!a.hasOwnProperty("order")) return 1

						return a.order - b.order
					})
			: []
	)

	return { notes }
})

export const removeNote = createAsyncThunk(
	"firebase/removeNote",
	({ userId, noteId }: { userId: string; noteId: string }) => {
		axios.delete(`${url}/${userId}/notes/${noteId}.json`)

		return noteId
	}
)

const initialState: FirebaseState = {
	notes: [],
	loading: false,
	filter: "active",
}

const firebaseSlice = createSlice({
	name: "firebase",
	initialState,
	reducers: {
		addNote(state, action) {
			state.notes.push(action.payload.user)
			state.loading = false
		},
		clearNotes(state) {
			state.notes = []
		},
		disableNote(state, action) {
			state.notes = state.notes.map((note) => {
				if (note.id === action.payload.id)
					return { ...note, isDisable: !note.isDisable, isImportant: false }
				return note
			})
		},
		importantNote(state, action) {
			state.notes = state.notes.map((note) => {
				if (note.id === action.payload.id)
					return { ...note, isImportant: !note.isImportant, isDisable: false }
				return note
			})
		},
		sortNotes(state, action) {
			state.notes = action.payload.notes.map((note: Note, i: number) => ({ ...note, order: i }))
		},
		changeFilter(state, action) {
			state.filter = action.payload.filter
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchNotes.pending, (state) => {
				state.loading = true
			})
			.addCase(fetchNotes.fulfilled, (state, action) => {
				state.notes = action.payload.notes
				state.loading = false
			})
			.addCase(fetchNotes.rejected, (state) => {
				state.loading = false
			})
			.addCase(removeNote.fulfilled, (state, action) => {
				state.notes = state.notes
					.filter((note) => note.id !== action.payload)
					.map((note, i) => ({ ...note, order: i }))
			})
	},
})

export const { addNote, clearNotes, sortNotes, disableNote, importantNote, changeFilter } =
	firebaseSlice.actions
export default firebaseSlice.reducer
