import { Reorder } from "framer-motion"
import axios from "axios"
import { removeNote, disableNote, importantNote } from "../store/slices/firebaseSlice"
import { useAppDispatch } from "hooks/redux-hooks"

const url = process.env.REACT_APP_DB_URL

interface Note {
	id: string
	title: string
	date: string
	isImportant: boolean
	isDisable: boolean
	order: number
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

interface NotesItemProps {
	note: Note
}

function NotesItem({ note }: NotesItemProps) {
	const dispatch = useAppDispatch()

	const onRemoveNote = (note: Note) => {
		axios.delete(`${url}/notes/${note.id}.json`)
		dispatch(removeNote({ note }))
	}

	const onDisableNote = (note: Note) => {
		const newNote = {
			title: note.title,
			date: note.date,
			isImportant: note.isImportant,
			isDisable: !note.isDisable,
			order: note.order,
		}
		axios.put(`${url}/notes/${note.id}.json`, newNote)

		dispatch(disableNote({ id: note.id }))
	}

	const onImportantNote = (note: Note) => {
		const newNote = {
			title: note.title,
			date: note.date,
			isImportant: !note.isImportant,
			isDisable: note.isDisable,
			order: note.order,
		}
		axios.put(`${url}/notes/${note.id}.json`, newNote)

		dispatch(importantNote({ id: note.id }))
	}

	let noteClass = "note list-group-item d-flex justify-content-between align-items-center"
	noteClass = note.isDisable
		? noteClass + " note__disable list-group-item-secondary"
		: note.isImportant
		? noteClass + " list-group-item-danger"
		: noteClass

	const importantClass = note.isImportant ? "text-danger fw-bold" : "text-secondary"
	const disableClass = note.isDisable ? "text-dark fw-bold" : "text-secondary"

	return (
		<Reorder.Item
			whileDrag={whileDrag}
			{...variants}
			key={note.id}
			value={note}
			className={noteClass}
		>
			<div className='form-check p-0'>
				<div className='form-check form-check-inline p-0'>
					<label className='form-check-label'>
						<input
							checked={note.isDisable}
							onChange={() => onDisableNote(note)}
							className='form-check-input d-none'
							type='checkbox'
						/>
						<span className={disableClass}>&#8856;</span>
					</label>
				</div>
				<div className='form-check form-check-inline'>
					<label className='form-check-label'>
						<input
							checked={note.isImportant}
							onChange={() => onImportantNote(note)}
							className='form-check-input d-none'
							type='checkbox'
						/>
						<span className={importantClass}>&#33;</span>
					</label>
				</div>
			</div>
			<div className='d-flex justify-content-between align-items-center note__info'>
				<strong>{note.title}</strong>
				<small>{note.date}</small>
			</div>
			<button
				onClick={() => onRemoveNote(note)}
				type='button'
				className='btn btn-outline-danger btn-close'
			></button>
		</Reorder.Item>
	)
}

export default NotesItem
