import {memo} from 'react';
import {Note} from 'types';
import {NotesItem} from 'components/NotesItem/NotesItem';

interface NotesListProps {
	notes: Note[]
	handleSort: boolean
}

export const NotesList = memo(({notes, handleSort}: NotesListProps) => {
	return (
		<>
			{notes.map((note: Note, index: number) => (
				<NotesItem note={note} index={index} key={note.id} handleSort={handleSort} />
			))}
		</>
	);
});
