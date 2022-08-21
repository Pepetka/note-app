import React from "react"
import axios from "axios"
import { FirebaseContext } from "./firebaseContext"
import { firebaseReducer } from "./firebaseReducer"
import { ADD_NOTE, FETCH_NOTES, REMOVE_NOTE, SHOW_LOADER } from "../types"

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

	const addNote = async (title) => {
		const note = { title, date: new Date().toJSON() }

		try {
			const response = await axios.post(`${url}/notes.json`, note)

			const payload = {
				...note,
				id: response.data.name,
			}

			dispatch({
				type: ADD_NOTE,
				payload,
			})
		} catch (error) {
			throw new Error(error.message)
		}
	}

	const removeNote = async (id) => {
		axios.delete(`${url}/notes/${id}.json`)

		dispatch({
			type: REMOVE_NOTE,
			payload: id,
		})
	}

	return (
		<FirebaseContext.Provider
			value={{
				showLoader,
				addNote,
				fetchNotes,
				removeNote,
				loading: state.loading,
				notes: state.notes,
			}}
		>
			{children}
		</FirebaseContext.Provider>
	)
}

export default FirebaseState
