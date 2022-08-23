import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import axios from "axios"
import { removeNote, sortNotes } from "../store/slices/firebaseSlice"

const url = process.env.REACT_APP_DB_URL

const Notes = () => {
	const { notes } = useSelector((state) => state.firebase)
	const dispatch = useDispatch()
	const [currentNote, setCurrentNode] = React.useState(null)

	const onRemoveNote = (id) => {
		axios.delete(`${url}/notes/${id}.json`)

		dispatch(removeNote({ id }))
	}

	const onSortNote = (note) => {
		axios.put(`${url}/notes/${currentNote.id}.json`, note)
		axios.put(`${url}/notes/${note.id}.json`, currentNote)

		dispatch(
			sortNotes({
				prevNote: note,
				currentNote,
			})
		)
	}

	const dragStartHandler = (event, note) => {
		setCurrentNode(note)
	}

	const dragOverHandler = (event) => {
		event.preventDefault()
	}

	const dragDropHandler = (event, note) => {
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
							onDragStart={(e) => dragStartHandler(e, note)}
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
