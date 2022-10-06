import {MouseEvent, useEffect, useRef, useState} from 'react';
import {CSSTransition} from 'react-transition-group';
import {disableNote, importantNote, removeNote, setContent} from 'store/slices/firebaseSlice';
import {useAppDispatch, useAppSelector} from 'hooks/useRedux';
import {Note} from 'types';
import {Draggable} from 'react-beautiful-dnd';
import {useTranslation} from 'react-i18next';
import {classNames} from 'helpers/classNames/classNames';
import {Button, ButtonThemes} from 'components/lib/Button/Button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
	faEyeSlash,
	faCircleExclamation,
	faTrashCan,
	faPenClip,
	faFloppyDisk,
	faSortDown,
} from '@fortawesome/free-solid-svg-icons';

import cls from './NotesItem.module.scss';
import './NotesItemAnimation.scss';

interface NotesItemProps {
	note: Note
	handleSort: boolean
	index: number
	storybookFilter?: 'all' | undefined
}

export const NotesItem = ({note, handleSort, index, storybookFilter}: NotesItemProps) => {
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

	return (
		<Draggable draggableId={note.id!} index={index} isDragDisabled={!handleSort}>
			{(provided) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}>
					<div
						className={
							classNames(
								[cls.Note],
								{
									[cls.disable]: note.isDisable,
									[cls.important]: note.isImportant && !note.isDisable,
									[cls.hide]: (((storybookFilter ?? filter) === 'isDisable' && !note.isDisable) ||
										((storybookFilter ?? filter) === 'active' && note.isDisable) ||
										((storybookFilter ?? filter) === 'isImportant' && !note.isImportant)),
								},
							)
						}
					>
						<div className={cls.wrapper}>
							<div className={cls.buttonGroup}>
								<div>
									<Button
										onClick={(e) => onDisableNote(e, note.id!)}
										className={classNames([], {[cls.btnDisable]: note.isDisable})}
										theme={ButtonThemes.CLEAR}
									>
										<FontAwesomeIcon icon={faEyeSlash}/>
									</Button>
								</div>
								<div>
									<Button
										onClick={(e) => onImportantNote(e, note.id!)}
										className={classNames([], {[cls.btnImportant]: note.isImportant})}
										theme={ButtonThemes.CLEAR}
									>
										<FontAwesomeIcon icon={faCircleExclamation}/>
									</Button>
								</div>
							</div>

							<div className={cls.info}>
								<strong className={cls.title}>{note.title}</strong>
								<small className={cls.date}>{note.date}</small>
							</div>

							<div className={cls.delete}>
								<Button
									onClick={(e) => onRemoveNote(e, note.id!)}
									className={cls.btnDelete}
									theme={ButtonThemes.CLEAR}
								>
									<FontAwesomeIcon icon={faTrashCan}/>
								</Button>
							</div>
						</div>

						<CSSTransition in={contentVisibility} classNames='noteContent' timeout={500} unmountOnExit>
							<div className={cls.content}>
								<div
									ref={inputRef}
									contentEditable={canText}
									data-placeholder={t('Add text')}
									className={cls.input}
								></div>

								<div className={cls.control}>
									<div>
										<Button
											onClick={onTextNote}
											className={classNames([], {[cls.btnCanText]: canText})}
											theme={ButtonThemes.CLEAR}
										>
											<FontAwesomeIcon icon={faPenClip}/>
										</Button>
									</div>

									<div>
										<Button
											onClick={() => onContentSave(note.id!)}
											className={cls.btnSave}
											theme={ButtonThemes.CLEAR}
										>
											<FontAwesomeIcon icon={faFloppyDisk}/>
										</Button>
									</div>
								</div>
							</div>
						</CSSTransition>

						<div className={cls.collapse}>
							<Button
								className={classNames([cls.btnCollapse], {[cls.btnOpen]: contentVisibility})}
								onClick={onChangeVisibility}
								theme={ButtonThemes.CLEAR}
							>
								<FontAwesomeIcon icon={faSortDown}/>
							</Button>
						</div>
					</div>
				</div>
			)}
		</Draggable>
	);
};
