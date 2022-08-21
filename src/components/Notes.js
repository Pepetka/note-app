import React from "react"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import { FirebaseContext } from "../context/firebase/firebaseContext"

const Notes = () => {
	const { notes, removeNote } = React.useContext(FirebaseContext)

	return (
		<TransitionGroup component='ul' className='list-group'>
			{notes.map((note) => (
				<CSSTransition key={note.id} timeout={500} classNames='animate-note'>
					<li className='note list-group-item d-flex justify-content-between align-items-center'>
						<div className='d-flex justify-content-between align-items-center'>
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
			))}
		</TransitionGroup>
	)
}

export default Notes
