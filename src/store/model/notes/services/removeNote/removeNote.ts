import {createAsyncThunk} from '@reduxjs/toolkit';
import {ThunkConfig} from 'store/model/types/StateSchema';

interface RemoveNoteProps {
	userId: string
	noteId: string
}

export const removeNote = createAsyncThunk<string, RemoveNoteProps, ThunkConfig<string>>(
	'notes/removeNote',
	({userId, noteId}, {rejectWithValue, extra}) => {
		try {
			extra.api.delete(`/${userId}/${noteId}.json`);

			return noteId;
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	});
