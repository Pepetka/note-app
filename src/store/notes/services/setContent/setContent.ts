import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {alertActions} from 'store/alert/slice/alertSlice';
import {withoutId} from 'helpers/withoutId/withoutId';
import {ThunkApi} from '../types';

const url = process.env.REACT_APP_DB_URL;

interface SetContentProps {
	content: string
	userId: string
	noteId: string
}

interface SetContentReturn {
	noteId: string
	content: string
}

export const setContent = createAsyncThunk<SetContentReturn, SetContentProps, ThunkApi>(
	'notes/setContent',
	async ({content, noteId, userId}, {getState, rejectWithValue, dispatch}) => {
		try {
			const {notes} = getState().notes;

			const data = withoutId({
				...notes.filter((el) => el.id === noteId)[0],
				content,
			});

			const response = await axios.put(`${url}/notes/${userId}/${noteId}.json`, data);

			if (response.statusText !== 'OK') {
				throw new Error('Server Error');
			} else {
				return {noteId, content};
			}
		} catch (error) {
			dispatch(alertActions.showAlert({text: (error as Error).message, type: 'danger'}));
			return rejectWithValue((error as Error).message);
		}
	},
);
