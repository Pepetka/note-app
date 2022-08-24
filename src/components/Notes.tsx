import { useAppDispatch, useAppSelector } from "hooks/redux-hooks"
import { Reorder } from "framer-motion"
import axios from "axios"
import { removeNote, sortNotes } from "../store/slices/firebaseSlice"

const url = process.env.REACT_APP_DB_URL

interface Note {
	id: string
	title: string
	date: string
	isImportant: boolean
}

const variants = {
	initial: {
		opacity: 0,
		height: 0,
	},
	animate: {
		opacity: 1,
		height: "auto",
	},
	exit: {
		opacity: 0,
		height: 0,
	},
}

const whileDrag = {
	scale: 1.1,
	boxShadow: "2px 2px 7px rgba(0,0,0,0.5)",
}

const Notes = () => {
	const { notes } = useAppSelector((state) => state.firebase)
	const dispatch = useAppDispatch()

	const onRemoveNote = (id: string) => {
		axios.delete(`${url}/notes/${id}.json`)

		dispatch(removeNote({ id }))
	}

	const onSortNote = (notes: Note[]) => {
		axios.put(`${url}/notes.json`, notes)

		dispatch(sortNotes(notes))
	}

	return (
		<Reorder.Group axis='y' values={notes} onReorder={onSortNote} className='list-group'>
			{notes.map((note) => {
				const noteClass = note.isImportant
					? "note list-group-item d-flex justify-content-between align-items-center list-group-item-danger"
					: "note list-group-item d-flex justify-content-between align-items-center"

				return (
					<Reorder.Item
						whileDrag={whileDrag}
						{...variants}
						key={note.id}
						value={note}
						className={noteClass}
					>
						<div className='d-flex justify-content-between align-items-center note__info'>
							<strong>{note.title}</strong>
							<small>{note.date}</small>
						</div>
						<button
							onClick={() => onRemoveNote(note.id)}
							type='button'
							className='btn btn-outline-danger btn-close'
						></button>
					</Reorder.Item>
				)
			})}
		</Reorder.Group>
	)
}

export default Notes
