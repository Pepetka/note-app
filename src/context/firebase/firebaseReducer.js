import { SHOW_LOADER, ADD_NOTE, FETCH_NOTES, REMOVE_NOTE, SORT_NOTES } from "../types"

const handlers = {
	[SHOW_LOADER]: (state) => ({ ...state, loading: true }),
	[ADD_NOTE]: (state, { payload }) => ({
		...state,
		notes: [...state.notes, payload],
		loading: false,
	}),
	[FETCH_NOTES]: (state, { payload }) => ({
		...state,
		notes: payload,
		loading: false,
	}),
	[REMOVE_NOTE]: (state, { payload }) => ({
		...state,
		notes: state.notes.filter((note) => note.id !== payload),
	}),
	[SORT_NOTES]: (state, { payload }) => ({
		...state,
		notes: state.notes.map((note) => {
			if (note.id === payload[0].id) return payload[1]
			if (note.id === payload[1].id) return payload[0]
			return note
		}),
	}),
	DEFAULT: (state) => state,
}

export const firebaseReducer = (state, action) => {
	const handle = handlers[action.type] || handlers.DEFAULT

	return handle(state, action)
}
