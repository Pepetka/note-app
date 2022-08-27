import { Reorder, useDragControls } from "framer-motion"
import axios from "axios"
import { removeNote, disableNote, importantNote } from "../store/slices/firebaseSlice"
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks"

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
}

function NotesItem({ note }: NotesItemProps) {
	const dispatch = useAppDispatch()
	const { id } = useAppSelector((state) => state.user)
	const controls = useDragControls()

	const onRemoveNote = (note: Note) => {
		axios.delete(`${url}/${id}/notes/${note.id}.json`)
		dispatch(removeNote({ id: note.id }))
	}

	const onDisableNote = (id: string) => {
		dispatch(disableNote({ id }))
	}

	const onImportantNote = (id: string) => {
		dispatch(importantNote({ id }))
	}

	let noteClass = "note list-group-item d-flex justify-content-between align-items-center w-100"
	noteClass = note.isDisable
		? noteClass + " note__disable list-group-item-success"
		: note.isImportant
		? noteClass + " list-group-item-danger"
		: noteClass

	const importantClass = note.isImportant ? "text-danger fw-bold" : "text-secondary"
	const disableClass = note.isDisable ? "text-dark fw-bold" : "text-secondary"

	return (
		<Reorder.Item
			whileDrag={whileDrag}
			{...variants}
			transition={{ duration: 0.5, ease: "easeOut" }}
			key={note.id}
			value={note}
			dragControls={controls}
			className={noteClass}
		>
			<div className='note__info'>
				<strong>{note.title}</strong>
				<small>{note.date}</small>
			</div>
			<div className='d-flex justify-content-between align-items-center'>
				<div className='form-check p-0 note__check-panel'>
					<div className='form-check form-check-inline p-0 note__disable'>
						<label className='form-check-label'>
							<input
								checked={note.isDisable}
								onChange={() => onDisableNote(note.id)}
								className='form-check-input d-none'
								type='checkbox'
							/>
							<span className={disableClass}>&#8856;</span>
						</label>
					</div>
					<div className='form-check form-check-inline note__important'>
						<label className='form-check-label'>
							<input
								checked={note.isImportant}
								onChange={() => onImportantNote(note.id)}
								className='form-check-input d-none'
								type='checkbox'
							/>
							<span className={importantClass}>&#33;</span>
						</label>
					</div>
				</div>
				<button
					onClick={() => onRemoveNote(note)}
					type='button'
					className='btn btn-outline-danger btn-close ps-5'
				></button>
				<div className='drag-ico' onPointerDown={(e) => controls.start(e)}>
					<div className='bar'></div>
					<div className='bar'></div>
					<div className='bar'></div>
				</div>
			</div>
		</Reorder.Item>
	)
}

export default NotesItem
