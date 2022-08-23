import React from "react"
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import axios from "axios"
import { removeNote, sortNotes } from "../store/slices/firebaseSlice"

const url = process.env.REACT_APP_DB_URL

interface Note {
	id: string
	date: string
	title: string
	isImportant: boolean
}

const initialCurrentNote = {
	id: "",
	date: "",
	title: "",
	isImportant: false,
}

const Notes = () => {
	const { notes } = useAppSelector((state) => state.firebase)
	const dispatch = useAppDispatch()
	const [currentNote, setCurrentNode] = React.useState<Note>(initialCurrentNote)

	const onRemoveNote = (id: string) => {
		axios.delete(`${url}/notes/${id}.json`)

		dispatch(removeNote({ id }))
	}

	const onSortNote = (note: Note) => {
		axios.put(`${url}/notes/${currentNote.id}.json`, note)
		axios.put(`${url}/notes/${note.id}.json`, currentNote)

		dispatch(
			sortNotes({
				prevNote: note,
				currentNote,
			})
		)
	}

	const dragStartHandler = (note: Note) => {
		setCurrentNode(note)
	}

	const dragOverHandler = (event: React.DragEvent<HTMLLIElement>) => {
		event.preventDefault()
	}

	const dragDropHandler = (event: React.DragEvent<HTMLLIElement>, note: Note) => {
		event.preventDefault()

		onSortNote(note)
	}

	return (
		<TransitionGroup component='ul' className='list-group'>
			{notes.map((note) => {
				const noteClass = note.isImportant
					? "note list-group-item d-flex justify-content-between align-items-center list-group-item-danger"
					: "note list-group-item d-flex justify-content-between align-items-center"

				return (
					<CSSTransition key={note.id} timeout={500} classNames='animate-note'>
						<li
							className={noteClass}
							draggable={true}
							onDragStart={(e) => dragStartHandler(note)}
							onDragOver={(e) => dragOverHandler(e)}
							onDrop={(e) => dragDropHandler(e, note)}
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
						</li>
					</CSSTransition>
				)
			})}
		</TransitionGroup>
	)
}

export default Notes
