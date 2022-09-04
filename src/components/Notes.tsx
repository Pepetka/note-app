import { useAppDispatch, useAppSelector } from "hooks/redux-hooks"
import { Reorder, AnimatePresence } from "framer-motion"
import axios from "axios"
import { sortNotes } from "../store/slices/firebaseSlice"
import NotesItem from "./NotesItem"
import React from "react"
import { Note } from "types"

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

interface Prop {
	handleSort: boolean
}

const Notes = ({ handleSort }: Prop) => {
	const { notes } = useAppSelector((state) => state.firebase)
	const userId = useAppSelector((state) => state.user.user.id)
	const dispatch = useAppDispatch()

	React.useEffect(() => {
		notes.forEach((note) => {
			axios.put(`${url}/${userId}/notes/${note.id}.json`, withoutId(note))
		})
		// eslint-disable-next-line
	}, [notes])

	const onSortNotes = (notes: Array<Note>) => {
		dispatch(sortNotes({ notes }))
	}

	return (
		<Reorder.Group axis='y' values={notes} onReorder={onSortNotes} className='list-group notes'>
			<AnimatePresence>
				{notes.map((note) => (
					<NotesItem handleSort={handleSort} key={note.id} note={note} />
				))}
			</AnimatePresence>
		</Reorder.Group>
	)
}

export default Notes
