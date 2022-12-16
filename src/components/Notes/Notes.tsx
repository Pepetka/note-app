import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import {NotesList} from 'components/NotesList/NotesList';
import {useTranslation} from 'react-i18next';
import {reorder} from 'shared/helpers/reorder/reorder';
import {getNotes} from 'store/model/notes/selectors/getNotes/getNotes';
import {getUser} from 'store/model/user/selectors/getUser/getUser';
import {useAppDispatch} from 'shared/hooks/useRedux';
import {sortNotes} from 'store/model/notes/services/sortNotes/sortNotes';
import {getLoading} from 'store/model/notes/selectors/getLoading/getLoading';
import {useSelector} from 'react-redux';
import {memo, useCallback} from 'react';
import {NoteSkeleton} from 'components/NoteSkeleton/NoteSkeleton';
import {VStack} from 'shared/lib/Flex/VStack';

import cls from './Notes.module.scss';

interface NotesProp {
	handleSort: boolean
}

export const Notes = memo(({handleSort}: NotesProp) => {
	const notes = useSelector(getNotes);
	const loading = useSelector(getLoading);
	const userData = useSelector(getUser);
	const dispatch = useAppDispatch();
	const {t} = useTranslation('home');

	const onDragEnd = useCallback((result: any) => {
		if (!result.destination) {
			return;
		}

		if (result.destination.index === result.source.index) {
			return;
		}

		const orderedNotes = reorder(notes, result.source.index, result.destination.index);

		dispatch(sortNotes({notes: orderedNotes, userId: userData!.id}));
	}, [dispatch, notes, userData]);

	if (loading) {
		return (
			<VStack style={{marginBottom: '16px'}} w100 data-testid='NoteSkeleton' gap='16'>
				<NoteSkeleton/>
				<NoteSkeleton/>
				<NoteSkeleton/>
			</VStack>
		);
	}

	if (!notes.length) {
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
					<VStack w100 {...provided.droppableProps} ref={provided.innerRef} data-testid='Notes'>
						<NotesList notes={notes} handleSort={handleSort} />
						{provided.placeholder}
					</VStack>
				)}
			</Droppable>
		</DragDropContext>
	);
});
