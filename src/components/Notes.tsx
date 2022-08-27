import { useAppDispatch, useAppSelector } from "hooks/redux-hooks"
import { Reorder, AnimatePresence } from "framer-motion"
import axios from "axios"
import { sortNotes } from "../store/slices/firebaseSlice"
import NotesItem from "./NotesItem"
import React from "react"

const url = process.env.REACT_APP_DB_URL

interface Note {
	id: string
	title: string
	date: string
	isImportant: boolean
	isDisable: boolean
	order: number
}

function withoutId(obj: { [key: string]: string | number | boolean }) {
	const result: { [key: string]: string | number | boolean } = {}
	for (let key of Object.keys(obj)) {
		if ("id" !== key) {
			result[key] = obj[key]
		}
	}
	return result
}

const Notes = () => {
	const { notes, filter } = useAppSelector((state) => state.firebase)
	const { id } = useAppSelector((state) => state.user)
	const dispatch = useAppDispatch()

	React.useEffect(() => {
		notes.forEach((note) => {
			axios.put(`${url}/${id}/notes/${note.id}.json`, withoutId(note))
		})
		// eslint-disable-next-line
	}, [notes])

	const onSortNotes = (notes: Note[]) => {
		dispatch(sortNotes({ notes }))
	}

	return (
		<Reorder.Group axis='y' values={notes} onReorder={onSortNotes} className='list-group notes'>
			<AnimatePresence>
				{notes
					.filter((note: { [key: string]: number | string | boolean }) => {
						if (filter === "all") return true
						if (filter === "active") return !note["isDisable"]
						return note[filter]
					})
					.map((note) => {
						return <NotesItem key={note.id} note={note} />
					})}
			</AnimatePresence>
		</Reorder.Group>
	)
}

export default Notes
