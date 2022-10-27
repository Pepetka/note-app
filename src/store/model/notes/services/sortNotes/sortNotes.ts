import {createAsyncThunk} from '@reduxjs/toolkit';
import {Note} from '../../types/NotesSchema';
import {notesActions} from 'store/model/notes/slice/notesSlice';
import {withoutId} from 'helpers/withoutId/withoutId';
import {ThunkConfig} from 'store/model/types/StateSchema';

interface SortNotesProps {
	notes: Note[]
	userId: string
}

export const sortNotes = createAsyncThunk<void, SortNotesProps, ThunkConfig<string>>(
	'notes/sortNotes',
	({notes, userId}, {dispatch, getState, extra}) => {
		const data = notes.map((note: Note, i: number) => ({...note, order: i}));
		const prevNotes = getState().notes.notes;

		data.forEach((note: Note) => {
			if (note.order !== prevNotes.filter((el) => el.id === note.id)[0].order) {
				extra.api.put(`/${userId}/${note.id}.json`, withoutId(note));
			}
		});

		dispatch(notesActions.setNotes({notes: data}));
	},
);
