import { createSlice } from "@reduxjs/toolkit"

interface FirebaseState {
	notes: {
		id: string
		title: string
		isImportant: boolean
		isDisable: boolean
		date: string
		order: number
	}[]
	loading: boolean
	filter: string
	leftHand: boolean
}

interface Note {
	id: string
	title: string
	date: string
	isImportant: boolean
	isDisable: boolean
	order: number
}

const initialState: FirebaseState = {
	notes: [],
	loading: true,
	filter: "active",
	leftHand: false,
}

const firebaseSlice = createSlice({
	name: "firebase",
	initialState,
	reducers: {
		addNote(state, action) {
			state.notes.push(action.payload.user)
			state.loading = false
		},
		fetchNotes(state, action) {
			state.notes = action.payload.users
			state.loading = false
		},
		clearNotes(state) {
			state.notes = []
		},
		removeNote(state, action) {
			state.notes = state.notes
				.filter((note) => note.id !== action.payload.id)
				.map((note, i) => ({ ...note, order: i }))
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
		changeHand(state) {
			state.leftHand = !state.leftHand
		},
		setHand(state, action) {
			state.leftHand = action.payload.leftHand
		},
	},
})

export const {
	addNote,
	fetchNotes,
	clearNotes,
	removeNote,
	sortNotes,
	disableNote,
	importantNote,
	changeFilter,
	changeHand,
	setHand,
} = firebaseSlice.actions
export default firebaseSlice.reducer
