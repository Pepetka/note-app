import {createAsyncThunk} from '@reduxjs/toolkit';
import {alertActions} from 'store/model/alert/slice/alertSlice';
import {withoutId} from 'shared/helpers/withoutId/withoutId';
import {ThunkConfig} from 'store/model/types/StateSchema';

interface SetContentProps {
	content: string
	userId: string
	noteId: string
}

interface SetContentReturn {
	noteId: string
	content: string
}

export const setContent = createAsyncThunk<SetContentReturn, SetContentProps, ThunkConfig<string>>(
	'notes/setContent',
	async ({content, noteId, userId}, {getState, rejectWithValue, extra, dispatch}) => {
		try {
			const {notes} = getState().notes;

			const data = withoutId({
				...notes.filter((el) => el.id === noteId)[0],
				content,
			});

			const response = await extra.api.put(`/${userId}/${noteId}.json`, data);

			if (response.statusText !== 'OK') throw new Error('Server Error');

			return {noteId, content};
		} catch (error) {
			dispatch(alertActions.showAlert({text: (error as Error).message, type: 'danger'}));
			return rejectWithValue((error as Error).message);
		}
	},
);
