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
	isDisable: boolean
	order: number
}

function filterProps(obj: { [key: string]: string | number | boolean }, props: string) {
	var result: { [key: string]: string | number | boolean } = {}
	for (let key of Object.keys(obj)) {
		if (props !== key) {
			result[key] = obj[key]
		}
	}
	return result
}

const Notes = () => {
	const { notes } = useAppSelector((state) => state.firebase)
	const dispatch = useAppDispatch()

	const onSortNote = (notes: Note[]) => {
		const newNotes = notes.map((note, i) => ({ ...note, order: i }))

		newNotes.forEach((note) => {
			axios.put(`${url}/notes/${note.id}.json`, filterProps(note, "id"))
		})

		dispatch(sortNotes(newNotes))
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
