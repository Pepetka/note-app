import { removeNote, disableNote, importantNote, setContent } from "../store/slices/firebaseSlice"
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks"
import { Note } from "types"
import { MouseEvent, useEffect, useRef, useState } from "react"
import { Draggable } from "react-beautiful-dnd"

interface NotesItemProps {
	note: Note
	handleSort: boolean
	index: number
}

function NotesItem({ note, handleSort, index }: NotesItemProps) {
	const dispatch = useAppDispatch()
	const userId = useAppSelector((state) => state.user.user.id)
	const { filter } = useAppSelector((state) => state.firebase)
	const [canText, setCanText] = useState(false)
	const [contentVisibility, setContentVisibility] = useState(false)
	const inputRef = useRef<null | HTMLDivElement>(null)

	useEffect(() => {
		if (note.content && inputRef.current) inputRef.current.innerHTML = note.content
	})

	useEffect(() => {
		if (canText && inputRef.current) inputRef.current.focus()
	}, [canText])

	const onContentSave = (id: string) => {
		setCanText(false)

		if (inputRef.current?.innerHTML)
			dispatch(setContent({ userId: userId!, content: inputRef.current.innerHTML, noteId: id }))
	}

	const onRemoveNote = (event: MouseEvent<HTMLButtonElement>, noteId: string) => {
		event.stopPropagation()
		dispatch(removeNote({ noteId, userId: userId! }))
	}

	const onDisableNote = (event: MouseEvent<HTMLButtonElement>, noteId: string) => {
		event.stopPropagation()
		dispatch(disableNote({ noteId, userId: userId! }))
	}

	const onImportantNote = (event: MouseEvent<HTMLButtonElement>, noteId: string) => {
		event.stopPropagation()
		dispatch(importantNote({ noteId, userId: userId! }))
	}

	const onTextNote = (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation()

		setCanText((canText) => !canText)
	}

	const onChangeVisibility = (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation()
		setContentVisibility((contentVisibility) => !contentVisibility)
	}

	const getNoteClasses = () => {
		let noteClass = "note list-group-item w-100 border-bottom border-secondary"
		noteClass = note.isDisable
			? noteClass + " note__disable secondary-elem"
			: note.isImportant
			? noteClass + " primary-elem"
			: noteClass + " secondary-elem"

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
		<Draggable draggableId={note.id!} index={index} isDragDisabled={!handleSort}>
			{(provided) => (
				<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
					<div className={getNoteClasses()}>
						<div className='row container-fluid w-100 ms-auto me-auto'>
							<div className='col-4 d-flex justify-content-start align-items-center'>
								<div className='form-check form-check-inline p-0 note__disable'>
									<button
										onClick={(e) => onDisableNote(e, note.id!)}
										className={"btn " + disableClass}
									>
										<i className='fa-solid fa-eye-slash'></i>
									</button>
								</div>
								<div className='form-check form-check-inline note__important'>
									<button
										onClick={(e) => onImportantNote(e, note.id!)}
										className={"btn " + importantClass}
									>
										<i className='fa-solid fa-circle-exclamation'></i>
									</button>
								</div>
							</div>

							<div className='note__info col-4 text-center'>
								<strong className='m-0 primary-text'>{note.title}</strong>
								<small className='secondary-text'>{note.date}</small>
							</div>

							<div className='col-4 d-flex justify-content-end'>
								<button
									onClick={(e) => onRemoveNote(e, note.id!)}
									type='button'
									className='btn text-danger'
								>
									<i className='fa-solid fa-trash-can'></i>
								</button>
							</div>
						</div>

						{contentVisibility && (
							<div className='note__content w-100 pt-4 pb-2 text-dark row container-fluid ms-auto me-auto align-items-start'>
								<div className='col-2'></div>

								<div className='ms-auto me-auto col-8'>
									<div
										ref={inputRef}
										contentEditable={canText}
										data-placeholder='Вставьте текст'
										className={`p-2 primary-text${canText ? " border border-secondary" : ""}`}
									></div>
								</div>

								<div className='d-flex flex-column align-items-end col-2'>
									<div>
										<button
											onClick={onTextNote}
											className={`btn ${canText ? "text-primary" : "text-secondary"}`}
										>
											<i className='fa-solid fa-pen-clip'></i>
										</button>
									</div>

									<div>
										<button onClick={() => onContentSave(note.id!)} className={`btn text-primary`}>
											<i className='fa-solid fa-floppy-disk'></i>
										</button>
									</div>
								</div>
							</div>
						)}

						<div className='text-center'>
							<button className='btn text-secondary w-100' onClick={(e) => onChangeVisibility(e)}>
								<i
									className={`fa-solid fa-sort-down${contentVisibility ? " active-visible" : ""}`}
								></i>
							</button>
						</div>
					</div>
				</div>
			)}
		</Draggable>
	)
}

export default NotesItem
