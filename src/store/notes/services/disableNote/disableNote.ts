import {createAsyncThunk} from '@reduxjs/toolkit';
import {withoutId} from 'helpers/withoutId/withoutId';
import {alertActions} from 'store/alert/slice/alertSlice';
import {ThunkConfig} from '../types';

interface DisableNoteProps {
	userId: string
	noteId: string
}

export const disableNote = createAsyncThunk<string, DisableNoteProps, ThunkConfig<string>>(
	'notes/disableNote',
	async ({userId, noteId}, {getState, rejectWithValue, extra, dispatch}) => {
		try {
			const {notes} = getState().notes;

			const data = withoutId({
				...notes.filter((el) => el.id === noteId)[0],
				isDisable: !notes.filter((el) => el.id === noteId)[0].isDisable,
				isImportant: false,
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
