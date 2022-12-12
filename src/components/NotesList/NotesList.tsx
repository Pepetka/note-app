import {memo} from 'react';
import {NotesItem} from 'components/NotesItem/NotesItem';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {Note} from 'store/model/notes/types/NotesSchema';

import './NotesListAnimation.scss';

interface NotesListProps {
	notes: Note[]
	handleSort: boolean
}

export const NotesList = memo(({notes, handleSort}: NotesListProps) => {
	return (
		<TransitionGroup data-testid='NotesList' style={{width: '100%'}}>
			{notes
				.map((note: Note, index: number) => {
					return (
						<CSSTransition
							key={note.id}
							timeout={300}
							classNames="note"
						>
							<NotesItem
								note={note}
								index={index}
								handleSort={handleSort}
							/>
						</CSSTransition>
					);
				})}
		</TransitionGroup>
	);
});
