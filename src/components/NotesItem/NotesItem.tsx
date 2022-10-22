import {useEffect, useRef, useState} from 'react';
import {CSSTransition} from 'react-transition-group';
import {Draggable} from 'react-beautiful-dnd';
import {useTranslation} from 'react-i18next';
import {classNames} from 'helpers/classNames/classNames';
import {Button, ButtonThemes} from 'lib/Button/Button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
	faCircleExclamation,
	faEye,
	faEyeSlash,
	faFloppyDisk,
	faPenClip,
	faSortDown,
	faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import {ModalConfirm} from 'components/ModalConfirm/ModalConfirm';
import {getUser} from 'store/user/selectors/getUser/getUser';
import {getFilter} from 'store/notes/selectors/getFilter/getFilter';
import {Note} from 'store/notes/types/NotesSchema';
import {useAppDispatch} from 'hooks/useRedux';
import {setContent} from 'store/notes/services/setContent/setContent';
import {removeNote} from 'store/notes/services/removeNote/removeNote';
import {disableNote} from 'store/notes/services/disableNote/disableNote';
import {importantNote} from 'store/notes/services/importantNote/importantNote';
import {useSelector} from 'react-redux';

import cls from './NotesItem.module.scss';
import './NotesItemAnimation.scss';

interface NotesItemProps {
	note: Note
	handleSort: boolean
	index: number
}

export const NotesItem = ({note, handleSort, index}: NotesItemProps) => {
	const dispatch = useAppDispatch();
	const userId = useSelector(getUser)?.id;
	const filter = useSelector(getFilter);
	const [canText, setCanText] = useState(false);
	const [contentVisibility, setContentVisibility] = useState(false);
	const inputRef = useRef<HTMLDivElement>(null);
	const {t} = useTranslation('home');
	const [isOpen, setIsOpen] = useState(false);

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

	const onRemoveNote = (noteId: string) => {
		dispatch(removeNote({noteId, userId: userId!}));
	};

	const onDisableNote = (noteId: string) => {
		dispatch(disableNote({noteId, userId: userId!}));
	};

	const onImportantNote = (noteId: string) => {
		dispatch(importantNote({noteId, userId: userId!}));
	};

	const onTextNote = () => {
		setCanText((canText) => !canText);
	};

	const onChangeVisibility = () => {
		setContentVisibility((contentVisibility) => !contentVisibility);
	};

	const onConfirmDelete = () => {
		setIsOpen(false);
		setTimeout(() => onRemoveNote(note.id!), 400);
	};

	return (
		<Draggable draggableId={note.id!} index={index} isDragDisabled={!handleSort}>
			{(provided) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}>
					<div
						data-testid='NotesItem'
						className={
							classNames(
								[cls.Note],
								{
									[cls.disable]: note.isDisable,
									[cls.important]: note.isImportant && !note.isDisable,
									[cls.hide]: ((filter === 'isDisable' && !note.isDisable) ||
										(filter === 'active' && note.isDisable) ||
										(filter === 'isImportant' && !note.isImportant)),
								},
							)
						}
						style={handleSort ? {cursor: 'grab'} : {cursor: 'auto'}}
					>
						<div className={cls.wrapper}>
							<div className={cls.buttonGroup}>
								<div>
									<Button
										onClick={() => onDisableNote(note.id!)}
										className={classNames([], {[cls.btnDisable]: note.isDisable})}
										theme={ButtonThemes.CLEAR}
									>
										{note.isDisable ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
									</Button>
								</div>
								<div>
									<Button
										onClick={() => onImportantNote(note.id!)}
										className={classNames([], {[cls.btnImportant]: note.isImportant})}
										theme={ButtonThemes.CLEAR}
									>
										<FontAwesomeIcon icon={faCircleExclamation} />
									</Button>
								</div>
							</div>

							<div className={cls.info}>
								<strong className={cls.title}>{note.title}</strong>
								<small className={cls.date}>{note.date}</small>
							</div>

							<div className={cls.delete}>
								<Button
									onClick={() => setIsOpen(true)}
									className={cls.btnDelete}
									theme={ButtonThemes.CLEAR}
								>
									<FontAwesomeIcon icon={faTrashCan} />
								</Button>
							</div>

							<ModalConfirm isOpen={isOpen} onClose={() => setIsOpen(false)} onConfirm={onConfirmDelete} />
						</div>

						<CSSTransition in={contentVisibility} classNames='noteContent' timeout={300} unmountOnExit>
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
											<FontAwesomeIcon icon={faPenClip} />
										</Button>
									</div>

									<div>
										<Button
											onClick={() => onContentSave(note.id!)}
											className={cls.btnSave}
											theme={ButtonThemes.CLEAR}
										>
											<FontAwesomeIcon icon={faFloppyDisk} />
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
								<FontAwesomeIcon icon={faSortDown} />
							</Button>
						</div>
					</div>
				</div>
			)}
		</Draggable>
	);
};
