import {memo, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {CSSTransition} from 'react-transition-group';
import {Draggable} from 'react-beautiful-dnd';
import {useTranslation} from 'react-i18next';
import {classNames} from 'shared/helpers/classNames/classNames';
import {Button, ButtonThemes} from 'shared/lib/Button/Button';
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
import {getUser} from 'store/model/user/selectors/getUser/getUser';
import {getFilter} from 'store/model/notes/selectors/getFilter/getFilter';
import {Note} from 'store/model/notes/types/NotesSchema';
import {useAppDispatch} from 'shared/hooks/useRedux';
import {setContent} from 'store/model/notes/services/setContent/setContent';
import {removeNote} from 'store/model/notes/services/removeNote/removeNote';
import {disableNote} from 'store/model/notes/services/disableNote/disableNote';
import {importantNote} from 'store/model/notes/services/importantNote/importantNote';
import {useSelector} from 'react-redux';
import {HStack} from 'shared/lib/Flex/HStack';
import {VStack} from 'shared/lib/Flex/VStack';
import {Popover} from 'shared/lib/Popover/Popover';
import {DrawerConfirm} from '../DrawerConfirm/DrawerConfirm';
import {BrowserView, MobileView} from 'react-device-detect';
import {useSwipe} from 'shared/hooks/useSwipe';

import cls from './NotesItem.module.scss';
import './NotesItemAnimation.scss';

interface NotesItemProps {
	note: Note
	handleSort: boolean
	index: number
}

interface NotesItemBaseProps {
	note: Note
	handleSort: boolean
}

export const NotesItemBase = memo(({handleSort, note}: NotesItemBaseProps) => {
	const dispatch = useAppDispatch();
	const userData = useSelector(getUser);
	const filter = useSelector(getFilter);
	const [canText, setCanText] = useState(false);
	const [contentVisibility, setContentVisibility] = useState(false);
	const {t} = useTranslation('home');
	const [isOpen, setIsOpen] = useState(false);
	const nodeRef = useRef<HTMLDivElement | null>(null);
	const inputRef = useRef<HTMLDivElement>(null);
	const {translate, onTouchStartHandle, onTouchEndHandle, onTouchMoveHandle, onForceClose} = useSwipe({
		direction: 'x',
		condition: 'coordinate',
		topCoordinate: 70,
		isSwipeDisabled: handleSort,
		limits: {
			bottomLimit: -100,
			topLimit: 200,
		},
		fixedLimits: true,
		blindArea: 30,
	});

	useEffect(() => {
		if (note.content && inputRef.current) inputRef.current.innerHTML = note.content;
	});

	useEffect(() => {
		if (canText && inputRef.current) inputRef.current.focus();
	}, [canText]);

	const onContentSave = useCallback((id: string) => () => {
		setCanText(false);

		if (inputRef.current?.innerHTML) {
			dispatch(setContent({
				userId: userData!.id,
				content: inputRef.current.innerHTML,
				noteId: id,
			}));
		}
	}, [dispatch, userData]);

	const {
		onRemoveNote,
		onDisableNote,
		onImportantNote,
	} = useMemo(() => ({
		onRemoveNote: (noteId: string) => {
			onForceClose();
			dispatch(removeNote({noteId, userId: userData!.id}));
		},
		onDisableNote: (noteId: string) => () => {
			onForceClose();
			dispatch(disableNote({noteId, userId: userData!.id}));
		},
		onImportantNote: (noteId: string) => () => {
			onForceClose();
			dispatch(importantNote({noteId, userId: userData!.id}));
		},
	}), [dispatch, onForceClose, userData]);

	const onConfirmDelete = useCallback(() => {
		setIsOpen(false);
		setTimeout(() => onRemoveNote(note.id!), 400);
	}, [note.id, onRemoveNote]);

	const {
		onTextNote,
		onChangeVisibility,
		onCloseModal,
		onOpenContent,
	} = useMemo(() => ({
		onTextNote: () => {
			setCanText((canText) => !canText);
		},
		onChangeVisibility: () => {
			setContentVisibility((contentVisibility) => !contentVisibility);
		},
		onCloseModal: () => {
			setIsOpen(false);
		},
		onOpenContent: () => {
			setIsOpen(true);
		},
	}), []);

	if ((filter === 'isDisable' && !note.isDisable) ||
		(filter === 'active' && note.isDisable) ||
		(filter === 'isImportant' && !note.isImportant)) {
		return null;
	}

	return (
		<div
			style={{position: 'relative', paddingBottom: '16px'}}
		>
			<MobileView>
				<HStack className={classNames([cls.buttonGroup, cls.swipeBtnGroup], {
					[cls.hide]: ((filter === 'isDisable' && !note.isDisable) ||
						(filter === 'active' && note.isDisable) ||
						(filter === 'isImportant' && !note.isImportant)),
				})}>
					<Button
						corners
						onClick={onDisableNote(note.id!)}
						className={classNames([cls.swipeDisable], {[cls.btnDisable]: note.isDisable})}
						theme={ButtonThemes.CLEAR}
					>
						{note.isDisable ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
					</Button>
					<Button
						corners
						onClick={onImportantNote(note.id!)}
						className={classNames([cls.swipeImportant], {[cls.btnImportant]: note.isImportant})}
						theme={ButtonThemes.CLEAR}
					>
						<FontAwesomeIcon icon={faCircleExclamation} />
					</Button>
				</HStack>

				<Button
					corners
					onClick={onOpenContent}
					className={classNames([cls.btnDelete, cls.swipeDelete], {
						[cls.hide]: ((filter === 'isDisable' && !note.isDisable) ||
							(filter === 'active' && note.isDisable) ||
							(filter === 'isImportant' && !note.isImportant)),
					})}
					theme={ButtonThemes.CLEAR}
				>
					<FontAwesomeIcon icon={faTrashCan} />
				</Button>
			</MobileView>

			<div
				ref={nodeRef}
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
				onTouchStart={onTouchStartHandle}
				onTouchEnd={onTouchEndHandle}
				onTouchMove={onTouchMoveHandle}
				style={{
					cursor: handleSort ? 'grab' : 'auto',
					left: `${translate}px`,
				}}
			>
				<HStack align='center' className={cls.wrapper}>
					<BrowserView>
						<HStack className={cls.buttonGroup}>
							<Popover
								popoverContent={note.isDisable ? t('Enabled note') : t('Disable note')}
								position='bottom-start'
							>
								<Button
									onClick={onDisableNote(note.id!)}
									className={classNames([], {[cls.btnDisable]: note.isDisable})}
									theme={ButtonThemes.CLEAR}
								>
									{note.isDisable ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
								</Button>
							</Popover>
							<Popover
								popoverContent={note.isImportant ? t('Unimportant note') : t('Important note')}
								position='bottom-start'
							>
								<Button
									onClick={onImportantNote(note.id!)}
									className={classNames([], {[cls.btnImportant]: note.isImportant})}
									theme={ButtonThemes.CLEAR}
								>
									<FontAwesomeIcon icon={faCircleExclamation} />
								</Button>
							</Popover>
						</HStack>
					</BrowserView>

					<VStack align='center' justify='center' className={cls.info}>
						<strong className={cls.title}>{note.title}</strong>
						<small className={cls.date}>{note.date}</small>
					</VStack>

					<BrowserView>
						<HStack justify='end' className={cls.delete}>
							<Popover
								popoverContent={t('Delete note')}
								position='bottom-end'
							>
								<Button
									onClick={onOpenContent}
									className={cls.btnDelete}
									theme={ButtonThemes.CLEAR}
								>
									<FontAwesomeIcon icon={faTrashCan} />
								</Button>
							</Popover>
						</HStack>
					</BrowserView>

					<BrowserView>
						<ModalConfirm isOpen={isOpen} onClose={onCloseModal} onConfirm={onConfirmDelete} />
					</BrowserView>
					<MobileView>
						<DrawerConfirm isOpen={isOpen} onClose={onCloseModal} onConfirm={onConfirmDelete} />
					</MobileView>
				</HStack>

				<CSSTransition in={contentVisibility} classNames='noteContent' timeout={300} unmountOnExit>
					<HStack justify='between' gap='24' className={cls.content}>
						<div
							ref={inputRef}
							contentEditable={canText}
							data-placeholder={t('Add text')}
							className={cls.input}
						></div>

						<VStack justify='end' align='end' className={cls.control}>
							<div>
								<Popover
									popoverContent={t('Add/Edit note content')}
									position='bottom-end'
								>
									<Button
										onClick={onTextNote}
										className={classNames([], {[cls.btnCanText]: canText})}
										theme={ButtonThemes.CLEAR}
									>
										<FontAwesomeIcon icon={faPenClip} />
									</Button>
								</Popover>
							</div>

							<div>
								<Popover
									popoverContent={t('Safe note content')}
									position='bottom-end'
								>
									<Button
										onClick={onContentSave(note.id!)}
										className={cls.btnSave}
										theme={ButtonThemes.CLEAR}
									>
										<FontAwesomeIcon icon={faFloppyDisk} />
									</Button>
								</Popover>
							</div>
						</VStack>
					</HStack>
				</CSSTransition>

				<div className={cls.collapse}>
					<Popover
						w100
						popoverContent={t('Open/Close note content')}
						position='bottom'
					>
						<Button
							w100
							className={classNames([cls.btnCollapse], {[cls.btnOpen]: contentVisibility})}
							onClick={onChangeVisibility}
							theme={ButtonThemes.CLEAR}
						>
							<FontAwesomeIcon icon={faSortDown} />
						</Button>
					</Popover>
				</div>
			</div>
		</div>
	);
});

export const NotesItem = memo(({note, handleSort, index}: NotesItemProps) => {
	return (
		<Draggable draggableId={note.id!} index={index} isDragDisabled={!handleSort}>
			{(provided) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					<NotesItemBase handleSort={handleSort} note={note} />
				</div>
			)}
		</Draggable>
	);
});
