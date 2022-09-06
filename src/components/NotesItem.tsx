import { Reorder } from "framer-motion"
import { removeNote, disableNote, importantNote } from "../store/slices/firebaseSlice"
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks"
import { Note } from "types"

const variants = {
	initial: {
		opacity: 0,
		x: -100,
	},
	animate: {
		opacity: 1,
		x: 0,
	},
	exit: {
		opacity: 0,
		x: -100,
	},
}

const whileDrag = {
	scale: 1.03,
	boxShadow: "2px 2px 7px rgba(0,0,0,0.5)",
}

interface NotesItemProps {
	note: Note
	handleSort: boolean
}

function NotesItem({ note, handleSort }: NotesItemProps) {
	const dispatch = useAppDispatch()
	const userId = useAppSelector((state) => state.user.user.id)
	const { filter } = useAppSelector((state) => state.firebase)

	const onRemoveNote = (noteId: string) => {
		dispatch(removeNote({ noteId, userId: userId! }))
	}

	const onDisableNote = (noteId: string) => {
		dispatch(disableNote({ noteId, userId: userId! }))
	}

	const onImportantNote = (noteId: string) => {
		dispatch(importantNote({ noteId, userId: userId! }))
	}

	const getNoteClasses = () => {
		let noteClass = "note list-group-item d-flex justify-content-between align-items-center w-100"
		noteClass = note.isDisable
			? noteClass + " note__disable list-group-item-success"
			: note.isImportant
			? noteClass + " list-group-item-danger"
			: noteClass

		if (
			(filter === "isDisable" && !note.isDisable) ||
			(filter === "active" && note.isDisable) ||
			(filter === "isImportant" && !note.isImportant)
		)
			return "note-hide"

		return noteClass
	}

	const importantClass = note.isImportant ? "text-danger fw-bold" : "text-secondary"
	const disableClass = note.isDisable ? "text-dark fw-bold" : "text-secondary"

	return (
		<Reorder.Item
			whileDrag={whileDrag}
			{...variants}
			transition={{ duration: 0.5, ease: "easeOut" }}
			value={note}
			className={getNoteClasses()}
			dragListener={handleSort}
		>
			<div className='d-flex justify-content-between align-items-center'>
				<div className='form-check form-check-inline p-0 note__disable'>
					<button onClick={() => onDisableNote(note.id!)} className={"btn " + disableClass}>
						&#8856;
					</button>
				</div>
				<div className='form-check form-check-inline note__important'>
					<button onClick={() => onImportantNote(note.id!)} className={"btn " + importantClass}>
						&#33;
					</button>
				</div>
			</div>
			<div className='note__info'>
				<strong>{note.title}</strong>
				<small>{note.date}</small>
			</div>

			<button
				onClick={() => onRemoveNote(note.id!)}
				type='button'
				className='btn btn-outline-danger btn-close'
			></button>
		</Reorder.Item>
	)
}

export default NotesItem
