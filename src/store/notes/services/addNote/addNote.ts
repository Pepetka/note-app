import {createAsyncThunk} from '@reduxjs/toolkit';
import {Note} from '../../types/NotesSchema';
import {ThunkConfig} from '../types';

interface AddNoteProps {
	title: string
	isImportant: boolean
	content?: string
}

export const addNote = createAsyncThunk<Note, AddNoteProps, ThunkConfig<string>>(
	'notes/addNote',
	async ({title, isImportant, content}, {getState, rejectWithValue, extra}) => {
		const {notes} = getState().notes;
		const userId = getState().user.user?.id;

		try {
			const note: Note = {
				title,
				date: new Date().toLocaleString(),
				isImportant,
				isDisable: false,
				order: notes.length,
				content,
			};

			const response = await extra.api.post(`/${userId}.json`, note);

			if (response.statusText !== 'OK') throw new Error('Server Error');

			return {
				id: response.data.name,
				...note,
			};
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	});
