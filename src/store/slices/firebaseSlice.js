import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	notes: [],
	loading: true,
}

const firebaseSlice = createSlice({
	name: "firebase",
	initialState,
	reducers: {
		showLoader(state) {
			state.loading = true
		},
		addNote(state, action) {
			state.notes = [...state.notes, action.payload.user]
			state.loading = false
		},
		fetchNotes(state, action) {
			state.notes = action.payload.users
			state.loading = false
		},
		removeNote(state, action) {
			state.notes = state.notes.filter((note) => note.id !== action.payload.id)
		},
		sortNotes(state, action) {
			state.notes = state.notes.map((note) => {
				if (note.id === action.payload.prevNote.id) return action.payload.currentNote
				if (note.id === action.payload.currentNote.id) return action.payload.prevNote
				return note
			})
		},
	},
})

export const { showLoader, addNote, fetchNotes, removeNote, sortNotes } = firebaseSlice.actions
export default firebaseSlice.reducer
