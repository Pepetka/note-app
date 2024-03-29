import {createAsyncThunk} from '@reduxjs/toolkit';
import {Note} from '../../types/NotesSchema';
import {notesActions} from '../../slice/notesSlice';
import {withoutId} from 'shared/helpers/withoutId/withoutId';
import {ThunkConfig} from 'store/model/types/StateSchema';

interface SortNotesProps {
	notes: Note[]
	userId: string
}

export const sortNotes = createAsyncThunk<Array<Note>, SortNotesProps, ThunkConfig<string>>(
	'notes/sortNotes',
	({notes, userId}, {getState, rejectWithValue, extra}) => {
		const data = notes.map((note: Note, i: number) => ({...note, order: i}));
		const prevNotes = getState().notes.notes;

		data.forEach((note: Note) => {
			if (note.order !== prevNotes.filter((el) => el.id === note.id)[0].order) {
				extra.api.put(`/${userId}/${note.id}.json`, withoutId(note));
			}
		});

		return data;
	},
);
