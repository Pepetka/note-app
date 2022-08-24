import React from "react"
import { Reorder } from "framer-motion"
import axios from "axios"
import { removeNote, disableNote } from "../store/slices/firebaseSlice"
import { useAppDispatch } from "hooks/redux-hooks"

const url = process.env.REACT_APP_DB_URL

interface Note {
	id: string
	title: string
	date: string
	isImportant: boolean
	isDisable: boolean
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

	const onRemoveNote = (id: string) => {
		axios.delete(`${url}/notes/${id}.json`)

		dispatch(removeNote({ id }))
	}

	const onDisableNote = (note: Note) => {
		const newNote = { ...note, isDisable: !note.isDisable }
		axios.put(`${url}/notes/${note.id}.json`, newNote)

		dispatch(disableNote({ id: note.id }))
	}

	let noteClass = "note list-group-item d-flex justify-content-between align-items-center"
	noteClass = note.isImportant ? noteClass + " list-group-item-danger" : noteClass
	noteClass = !note.isDisable ? noteClass : noteClass + " note__disable"

	return (
		<Reorder.Item
			whileDrag={whileDrag}
			{...variants}
			key={note.id}
			value={note}
			className={noteClass}
		>
			<div className='form-check'>
				<input
					checked={note.isDisable}
					onChange={() => onDisableNote(note)}
					className='form-check-input'
					type='checkbox'
					value=''
					id='flexCheckDefault'
				/>
			</div>
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
}

export default NotesItem
