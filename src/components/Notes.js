import React from "react"
import { FirebaseContext } from "../context/firebase/firebaseContext"

const Notes = () => {
	const { notes, removeNote } = React.useContext(FirebaseContext)

	return (
		<ul className='list-group'>
			{notes.map((note) => (
				<li
					key={note.id}
					className='note list-group-item d-flex justify-content-between align-items-center'
				>
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
			))}
		</ul>
	)
}

export default Notes
