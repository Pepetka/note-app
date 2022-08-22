import React from "react"
import axios from "axios"
import { FirebaseContext } from "./firebaseContext"
import { firebaseReducer } from "./firebaseReducer"
import { ADD_NOTE, FETCH_NOTES, REMOVE_NOTE, SHOW_LOADER, SORT_NOTES } from "../types"

const url = process.env.REACT_APP_DB_URL

const FirebaseState = ({ children }) => {
	const initialState = {
		notes: [],
		loading: false,
	}
	const [state, dispatch] = React.useReducer(firebaseReducer, initialState)

	const showLoader = () => {
		dispatch({
			type: SHOW_LOADER,
		})
	}

	const fetchNotes = async () => {
		showLoader()
		const response = await axios.get(`${url}/notes.json`)

		const payload = response.data
			? Object.keys(response.data).map((key) => ({
					...response.data[key],
					id: key,
			  }))
			: []

		dispatch({
			type: FETCH_NOTES,
			payload,
		})
	}

	const addNote = async (title, isImportant) => {
		const note = { title, date: new Date().toJSON(), isImportant }

		try {
			const response = await axios.post(`${url}/notes.json`, note)

			const payload = {
				id: response.data.name,
				...note,
			}

			dispatch({
				type: ADD_NOTE,
				payload,
			})
		} catch (error) {
			throw new Error(error.message)
		}
	}

	const removeNote = (id) => {
		axios.delete(`${url}/notes/${id}.json`)

		dispatch({
			type: REMOVE_NOTE,
			payload: id,
		})
	}

	const sortNotes = (currentNote, note) => {
		const payload = [currentNote, note]

		axios.put(`${url}/notes/${currentNote.id}.json`, note)
		axios.put(`${url}/notes/${note.id}.json`, currentNote)

		dispatch({
			type: SORT_NOTES,
			payload,
		})
	}

	return (
		<FirebaseContext.Provider
			value={{
				showLoader,
				addNote,
				fetchNotes,
				removeNote,
				sortNotes,
				loading: state.loading,
				notes: state.notes,
			}}
		>
			{children}
		</FirebaseContext.Provider>
	)
}

export default FirebaseState
