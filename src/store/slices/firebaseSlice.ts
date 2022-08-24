import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface FirebaseState {
	notes: { id: string; title: string; isImportant: boolean; date: string }[]
	loading: boolean
}

interface ActionRemove {
	id: string
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
		removeNote(state, action: PayloadAction<ActionRemove>) {
			state.notes = state.notes.filter((note) => note.id !== action.payload.id)
		},
		sortNotes(state, action) {
			state.notes = action.payload
		},
	},
})

export const { showLoader, addNote, fetchNotes, removeNote, sortNotes } = firebaseSlice.actions
export default firebaseSlice.reducer
