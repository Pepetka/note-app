import {describe, expect, test} from '@jest/globals';
import {TestAsyncThunk} from 'shared/helpers/test/asyncThunk/asyncThunk';
import {addNote} from './addNote';
import {Note} from '../../types/NotesSchema';
import {StateSchema} from '../../../types/StateSchema';

describe('addNote', () => {
	const note: DeepPartial<Note> = {
		title: 'some title',
		isImportant: false,
		content: 'some content',
	};

	const state: DeepPartial<StateSchema> = {
		notes: {
			notes: [
				{
					title: 'tile1',
					order: 0,
					id: 'id 1',
				},
				{
					title: 'tile1',
					order: 1,
					id: 'id 2',
				},
			],
		},
		user: {
			user: {
				id: 'some user id',
				token: '',
				email: '',
			},
		},
	};

	test('fulfilled', async () => {
		const data = {
			name: 'id 3',
		};

		const thunk = new TestAsyncThunk(addNote, state);
		thunk.api.post.mockReturnValue(Promise.resolve({data, statusText: 'OK'}));
		const result = await thunk.callThunk(note as Note);

		expect(thunk.api.post).toHaveBeenCalled();
		expect(result.meta.requestStatus).toEqual('fulfilled');
		expect({...result.payload as Note, date: 'some date'}).toEqual(
			{
				id: data.name,
				date: 'some date',
				isDisable: false,
				order: state.notes?.notes?.length,
				...note,
			},
		);
	});

	test('rejected', async () => {
		const thunk = new TestAsyncThunk(addNote, state);
		thunk.api.post.mockReturnValue(Promise.resolve({status: 403}));
		const result = await thunk.callThunk(note as Note);

		expect(thunk.api.post).toHaveBeenCalled();
		expect(result.meta.requestStatus).toEqual('rejected');
	});
});
