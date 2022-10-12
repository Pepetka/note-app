import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {withoutId} from 'helpers/withoutId/withoutId';
import {alertActions} from 'store/alert/slice/alertSlice';
import {ThunkApi} from '../types';

const url = process.env.REACT_APP_DB_URL;

interface DisableNoteProps {
	userId: string
	noteId: string
}

export const disableNote = createAsyncThunk<string, DisableNoteProps, ThunkApi>(
	'notes/disableNote',
	async ({userId, noteId}, {getState, rejectWithValue, dispatch}) => {
		try {
			const {notes} = getState().notes;

			const data = withoutId({
				...notes.filter((el) => el.id === noteId)[0],
				isDisable: !notes.filter((el) => el.id === noteId)[0].isDisable,
				isImportant: false,
			});

			const response = await axios.put(`${url}/notes/${userId}/${noteId}.json`, data);

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
