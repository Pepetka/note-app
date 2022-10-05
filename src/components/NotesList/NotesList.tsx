import {memo} from 'react';
import {Note} from 'types';
import {NotesItem} from 'components/NotesItem/NotesItem';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import './NotesListAnimation.scss';

interface NotesListProps {
	notes: Note[]
	handleSort: boolean
	storybookFilter?: 'all'
}

export const NotesList = memo(({notes, handleSort, storybookFilter}: NotesListProps) => {
	return (
		<TransitionGroup>
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
								storybookFilter={storybookFilter}
							/>
						</CSSTransition>
					);
				})}
		</TransitionGroup>
	);
});
