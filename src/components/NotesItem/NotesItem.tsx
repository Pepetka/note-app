import {removeNote, disableNote, importantNote, setContent} from 'store/slices/firebaseSlice';
import {useAppDispatch, useAppSelector} from 'hooks/useRedux';
import {Note} from 'types';
import {MouseEvent, useEffect, useRef, useState} from 'react';
import {Draggable} from 'react-beautiful-dnd';
import {useTranslation} from 'react-i18next';

import './NotesItem.scss';

interface NotesItemProps {
	note: Note
	handleSort: boolean
	index: number
}

export const NotesItem = ({note, handleSort, index}: NotesItemProps) => {
	const dispatch = useAppDispatch();
	const userId = useAppSelector((state) => state.user.user.id);
	const {filter} = useAppSelector((state) => state.firebase);
	const [canText, setCanText] = useState(false);
	const [contentVisibility, setContentVisibility] = useState(false);
	const inputRef = useRef<null | HTMLDivElement>(null);
	const {t} = useTranslation('home');

	useEffect(() => {
		if (note.content && inputRef.current) inputRef.current.innerHTML = note.content;
	});

	useEffect(() => {
		if (canText && inputRef.current) inputRef.current.focus();
	}, [canText]);

	const onContentSave = (id: string) => {
		setCanText(false);

		if (inputRef.current?.innerHTML) {
			dispatch(setContent({
				userId: userId!,
				content: inputRef.current.innerHTML,
				noteId: id,
			}));
		}
	};

	const onRemoveNote = (event: MouseEvent<HTMLButtonElement>, noteId: string) => {
		event.stopPropagation();
		dispatch(removeNote({noteId, userId: userId!}));
	};

	const onDisableNote = (event: MouseEvent<HTMLButtonElement>, noteId: string) => {
		event.stopPropagation();
		dispatch(disableNote({noteId, userId: userId!}));
	};

	const onImportantNote = (event: MouseEvent<HTMLButtonElement>, noteId: string) => {
		event.stopPropagation();
		dispatch(importantNote({noteId, userId: userId!}));
	};

	const onTextNote = (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();

		setCanText((canText) => !canText);
	};

	const onChangeVisibility = (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		setContentVisibility((contentVisibility) => !contentVisibility);
	};

	const getNoteClasses = () => {
		let noteClass = 'note';
		noteClass = note.isDisable ?
			noteClass + ' note_disable' :
			note.isImportant ?
				noteClass + ' note_important' :
				noteClass + '';

		if ((filter === 'isDisable' && !note.isDisable) ||
			(filter === 'active' && note.isDisable) ||
			(filter === 'isImportant' && !note.isImportant)) return 'note_hide';

		return noteClass;
	};

	return (
		<Draggable draggableId={note.id!} index={index} isDragDisabled={!handleSort}>
			{(provided) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}>
					<div className={getNoteClasses()}>
						<div className='note__wrapper'>
							<div className='note__buttonGroup'>
								<div className='note__buttonDisable'>
									<button
										onClick={(e) => onDisableNote(e, note.id!)}
										className={`note__button ${note.isDisable ? 'note__button_disable' : ''}`}
									>
										<i className='fa-solid fa-eye-slash'></i>
									</button>
								</div>
								<div className='note__buttonImportant'>
									<button
										onClick={(e) => onImportantNote(e, note.id!)}
										className={`note__button ${note.isImportant ? 'note__button_important' : ''}`}
									>
										<i className='fa-solid fa-circle-exclamation'></i>
									</button>
								</div>
							</div>

							<div className='note__info'>
								<strong className='note__title'>{note.title}</strong>
								<small className='note__date'>{note.date}</small>
							</div>

							<div className='note__delete'>
								<button
									onClick={(e) => onRemoveNote(e, note.id!)}
									type='button'
									className='note__button note__button_delete'
								>
									<i className='fa-solid fa-trash-can'></i>
								</button>
							</div>
						</div>

						{contentVisibility && (
							<div className='content'>
								<div
									ref={inputRef}
									contentEditable={canText}
									data-placeholder={t('Add text')}
									className={`content__input`}
								></div>

								<div className='content__control'>
									<div>
										<button
											onClick={onTextNote}
											className={`note__button ${canText ? 'note__button_canText' : ''}`}
										>
											<i className='fa-solid fa-pen-clip'></i>
										</button>
									</div>

									<div>
										<button onClick={() => onContentSave(note.id!)} className={`note__button note__button_save`}>
											<i className='fa-solid fa-floppy-disk'></i>
										</button>
									</div>
								</div>
							</div>
						)}

						<div className='note__collapse'>
							<button
								className={`note__button note__button_collapse ${contentVisibility ? 'note__button_open' : ''}`}
								onClick={(e) => onChangeVisibility(e)}>
								<i
									className={`fa-solid fa-sort-down`}
								></i>
							</button>
						</div>
					</div>
				</div>
			)}
		</Draggable>
	);
};
