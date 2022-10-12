import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import {NotesList} from 'components/NotesList/NotesList';
import {useTranslation} from 'react-i18next';
import {reorder} from 'helpers/reorder/reorder';
import {getNotes} from 'store/notes/selectors/getNotes/getNotes';
import {getUser} from 'store/user/selectors/getUser/getUser';
import {useAppDispatch, useAppSelector} from 'hooks/useRedux';

import cls from './Notes.module.scss';
import {sortNotes} from 'store/notes/services/sortNotes/sortNotes';

interface Prop {
	handleSort: boolean
}

export const Notes = ({handleSort}: Prop) => {
	const notes = useAppSelector(getNotes);
	const userId = useAppSelector(getUser)?.id;
	const dispatch = useAppDispatch();
	const {t} = useTranslation('home');

	function onDragEnd(result: any) {
		if (!result.destination) {
			return;
		}

		if (result.destination.index === result.source.index) {
			return;
		}

		const orderedNotes = reorder(notes, result.source.index, result.destination.index);

		dispatch(sortNotes({notes: orderedNotes, userId: userId!}));
	}

	if (notes.length < 1) {
		return (
			<div className={cls.empty}>
				<h1>{t('There are no notes')}</h1>
			</div>
		);
	}

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId='droppable'>
				{(provided) => (
					<div className={cls.Notes} {...provided.droppableProps} ref={provided.innerRef} data-testid='Notes'>
						<NotesList notes={notes} handleSort={handleSort} />
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
};
