import { useAppDispatch, useAppSelector } from "hooks/redux-hooks"
import { Reorder } from "framer-motion"
import axios from "axios"
import { sortNotes } from "../store/slices/firebaseSlice"
import NotesItem from "./NotesItem"

const url = process.env.REACT_APP_DB_URL

interface Note {
	id: string
	title: string
	date: string
	isImportant: boolean
	isActive: boolean
}

const Notes = () => {
	const { notes } = useAppSelector((state) => state.firebase)
	const dispatch = useAppDispatch()

	const onSortNote = (notes: Note[]) => {
		axios.put(`${url}/notes.json`, notes)

		dispatch(sortNotes(notes))
	}

	return (
		<Reorder.Group axis='y' values={notes} onReorder={onSortNote} className='list-group'>
			{notes.map((note) => {
				return <NotesItem key={note.id} note={note} />
			})}
		</Reorder.Group>
	)
}

export default Notes
