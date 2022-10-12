import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {ThunkApi} from '../types';

const url = process.env.REACT_APP_DB_URL;

interface RemoveNoteProps {
	userId: string
	noteId: string
}

export const removeNote = createAsyncThunk<string, RemoveNoteProps, ThunkApi>(
	'notes/removeNote',
	({userId, noteId}, {rejectWithValue}) => {
		try {
			axios.delete(`${url}/notes/${userId}/${noteId}.json`);

			return noteId;
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	});
