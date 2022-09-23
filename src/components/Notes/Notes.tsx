import {useAppDispatch, useAppSelector} from 'hooks/useRedux';
import {sortNotes} from 'store/slices/firebaseSlice';
import {Note} from 'types';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import {NotesList} from 'components/NotesList/NotesList';

interface Prop {
	handleSort: boolean
}

const reorder = (list: Array<Note>, startIndex: number, endIndex: number) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

export const Notes = ({handleSort}: Prop) => {
	const {notes} = useAppSelector((state) => state.firebase);
	const {id} = useAppSelector((state) => state.user.user);
	const dispatch = useAppDispatch();

	function onDragEnd(result: any) {
		if (!result.destination) {
			return;
		}

		if (result.destination.index === result.source.index) {
			return;
		}

		const orderedNotes = reorder(notes, result.source.index, result.destination.index);

		dispatch(sortNotes({notes: orderedNotes, userId: id!}));
	}

	if (notes.length < 1) {
		return (
			<div className='d-flex justify-content-center align-items-center flex-column'>
				<h1>There are no notes</h1>
			</div>
		);
	}

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId='droppable'>
				{(provided) => (
					<div {...provided.droppableProps} ref={provided.innerRef}>
						<NotesList notes={notes} handleSort={handleSort} />
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
};
