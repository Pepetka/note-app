import {createAsyncThunk} from '@reduxjs/toolkit';
import {Note} from '../../types/NotesSchema';
import axios from 'axios';
import {notesActions} from 'store/notes/slice/notesSlice';
import {withoutId} from 'helpers/withoutId/withoutId';
import {ThunkApi} from '../types';

const url = process.env.REACT_APP_DB_URL;

interface SortNotesProps {
	notes: Note[]
	userId: string
}

export const sortNotes = createAsyncThunk<void, SortNotesProps, ThunkApi>(
	'notes/sortNotes',
	({notes, userId}, {dispatch, getState}) => {
		const data = notes.map((note: Note, i: number) => ({...note, order: i}));
		const prevNotes = getState().notes.notes;

		data.forEach((note: Note) => {
			if (note.order !== prevNotes.filter((el) => el.id === note.id)[0].order) {
				axios.put(`${url}/notes/${userId}/${note.id}.json`, withoutId(note));
			}
		});

		dispatch(notesActions.setNotes({notes: data}));
	},
);
