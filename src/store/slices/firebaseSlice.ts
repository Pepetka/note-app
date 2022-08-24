import { createSlice } from "@reduxjs/toolkit"

interface FirebaseState {
	notes: { id: string; title: string; isImportant: boolean; isDisable: boolean; date: string }[]
	loading: boolean
}

const initialState: FirebaseState = {
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
		disableNote(state, action) {
			state.notes = state.notes.map((note) => {
				if (note.id === action.payload.id) return { ...note, isDisable: !note.isDisable }
				return note
			})
		},
		sortNotes(state, action) {
			state.notes = action.payload
		},
	},
})

export const { showLoader, addNote, fetchNotes, removeNote, sortNotes, disableNote } =
	firebaseSlice.actions
export default firebaseSlice.reducer
