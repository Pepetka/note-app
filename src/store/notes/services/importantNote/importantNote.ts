import {createAsyncThunk} from '@reduxjs/toolkit';
import {withoutId} from 'helpers/withoutId/withoutId';
import {alertActions} from 'store/alert/slice/alertSlice';
import {ThunkConfig} from '../types';

interface ImportantNoteProps {
	userId: string
	noteId: string
}

export const importantNote = createAsyncThunk<string, ImportantNoteProps, ThunkConfig<string>>(
	'notes/importantNote',
	async ({userId, noteId}, {getState, rejectWithValue, dispatch, extra}) => {
		try {
			const {notes} = getState().notes;

			const data = withoutId({
				...notes.filter((el) => el.id === noteId)[0],
				isImportant: !notes.filter((el) => el.id === noteId)[0].isImportant,
				isDisable: false,
			});

			const response = await extra.api.put(`/${userId}/${noteId}.json`, data);

			if (response.statusText !== 'OK') {
				throw new Error('Server Error');
			} else {
				return noteId;
			}
		} catch (error) {
			dispatch(alertActions.showAlert({text: (error as Error).message, type: 'danger'}));
			return rejectWithValue((error as Error).message);
		}
	});
