import {createAsyncThunk} from '@reduxjs/toolkit';
import {Note} from '../../types/NotesSchema';
import {ResponseType} from '../types';
import {ThunkConfig} from 'store/types/StateSchema';

export const fetchNotes = createAsyncThunk<Note[], string, ThunkConfig<string>>(
	'notes/fetchNotes',
	async (userId, {rejectWithValue, extra}) => {
		try {
			const response = await extra.api.get<ResponseType>(`/${userId}.json`);

			if (response.data) {
				const notes: Array<Note> = Object.entries(response.data).map((el) => ({...el[1], id: el[0]}));

				return notes.sort((a, b) => a.order - b.order);
			} else {
				return [];
			}
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	},
);
