import {memo} from 'react';
import {Note} from 'types';
import {NotesItem} from 'components/NotesItem/NotesItem';

interface NotesListProps {
	notes: Note[]
	handleSort: boolean
	storybookFilter?: 'all' | undefined
}

export const NotesList = memo(({notes, handleSort, storybookFilter}: NotesListProps) => {
	return (
		<>
			{notes
				.map((note: Note, index: number) => (
					<NotesItem
						note={note}
						index={index}
						key={note.id}
						handleSort={handleSort}
						storybookFilter={storybookFilter}
					/>
				))}
		</>
	);
});
