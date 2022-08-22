import React from "react"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import { FirebaseContext } from "../context/firebase/firebaseContext"

const Notes = () => {
	const { notes, removeNote, sortNotes } = React.useContext(FirebaseContext)
	const [currentNote, setCurrentNode] = React.useState(null)

	const dragStartHandler = (event, note) => {
		setCurrentNode(note)
	}

	const dragOverHandler = (event) => {
		event.preventDefault()
	}

	const dragDropHandler = (event, note) => {
		event.preventDefault()

		sortNotes(currentNote, note)
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
								onClick={() => removeNote(note.id)}
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
