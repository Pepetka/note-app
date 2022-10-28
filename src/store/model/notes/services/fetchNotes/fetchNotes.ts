import {createAsyncThunk} from '@reduxjs/toolkit';
import {Note} from '../../types/NotesSchema';
import {ResponseType} from '../types';
import {ThunkConfig} from 'store/model/types/StateSchema';

export const fetchNotes = createAsyncThunk<Note[], string, ThunkConfig<string>>(
	'notes/fetchNotes',
	async (userId, {rejectWithValue, extra}) => {
		try {
			const response = await extra.api.get<ResponseType>(`/${userId}.json`);
			let notes: Array<Note> = [];

			if (response.statusText !== 'OK') throw new Error('server error');

			if (response.data) {
				notes = Object.entries(response.data)
					.map((el) => ({...el[1], id: el[0]}))
					.sort((a, b) => a.order - b.order);
			}

			return notes;
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	},
);
