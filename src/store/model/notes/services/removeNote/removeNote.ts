import {createAsyncThunk} from '@reduxjs/toolkit';
import {ThunkConfig} from 'store/model/types/StateSchema';

interface RemoveNoteProps {
	userId: string
	noteId: string
}

export const removeNote = createAsyncThunk<string, RemoveNoteProps, ThunkConfig<string>>(
	'notes/removeNote',
	async ({userId, noteId}, {rejectWithValue, extra}) => {
		try {
			const response = await extra.api.delete(`/${userId}/${noteId}.json`);

			if (response.statusText !== 'OK') throw new Error('Server error');

			return noteId;
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	});
