import {useAppDispatch, useAppSelector} from 'hooks/useRedux';
import {sortNotes} from 'store/slices/firebaseSlice';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import {NotesList} from 'components/NotesList/NotesList';
import {useTranslation} from 'react-i18next';
import {reorder} from 'helpers/reorder/reorder';
import {Note} from 'types';

import cls from './Notes.module.scss';

interface Prop {
	handleSort: boolean
	storybookNotes?: Array<Note>
	storybookFilter?: 'all'
}

export const Notes = ({handleSort, storybookNotes, storybookFilter}: Prop) => {
	const {notes} = useAppSelector((state) => state.firebase);
	const {id} = useAppSelector((state) => state.user.user);
	const dispatch = useAppDispatch();
	const {t} = useTranslation('home');

	const notesArray = storybookNotes ?? notes;

	function onDragEnd(result: any) {
		if (!result.destination) {
			return;
		}

		if (result.destination.index === result.source.index) {
			return;
		}

		const orderedNotes = reorder(notesArray, result.source.index, result.destination.index);

		dispatch(sortNotes({notes: orderedNotes, userId: id!}));
	}

	if (notesArray.length < 1) {
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
					<div className={cls.Notes} {...provided.droppableProps} ref={provided.innerRef}>
						<NotesList storybookFilter={storybookFilter} notes={notesArray} handleSort={handleSort} />
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
};
