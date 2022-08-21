import React from "react"
import { FirebaseContext } from "../context/firebase/firebaseContext"

const Notes = () => {
	const { notes, removeNote } = React.useContext(FirebaseContext)

	return (
		<ul className='list-group'>
			{notes.map((note) => {
				const noteClass = note.isImportant
					? "note list-group-item d-flex justify-content-between align-items-center list-group-item-danger"
					: "note list-group-item d-flex justify-content-between align-items-center"

				return (
					<li key={note.id} className={noteClass}>
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
				)
			})}
		</ul>
	)
}

export default Notes
