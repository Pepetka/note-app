import {createAsyncThunk} from '@reduxjs/toolkit';
import {Note} from '../../types/NotesSchema';
import axios from 'axios';
import {ThunkApi, ResponseType} from '../types';

const url = process.env.REACT_APP_DB_URL;

export const fetchNotes = createAsyncThunk<Note[], string, ThunkApi>(
	'notes/fetchNotes',
	async (userId, {rejectWithValue}) => {
		try {
			const response = await axios.get<ResponseType>(`${url}/notes/${userId}.json`);

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
