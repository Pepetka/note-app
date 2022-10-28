import {describe, expect, test} from '@jest/globals';
import {TestAsyncThunk} from 'helpers/test/asyncThunk/asyncThunk';
import {disableNote} from './disableNote';
import {StateSchema} from '../../../types/StateSchema';

describe('disableNote', () => {
	const state: DeepPartial<StateSchema> = {
		notes: {
			notes: [
				{
					title: 'tile1',
					order: 0,
					id: 'id 1',
					content: 'content',
					isDisable: false,
					date: 'date',
					isImportant: false,
				},
				{
					title: 'tile1',
					order: 1,
					id: 'id 2',
					content: 'content',
					isDisable: false,
					date: 'date',
					isImportant: false,
				},
				{
					title: 'tile1',
					order: 1,
					id: 'note id',
					content: 'content',
					isDisable: false,
					date: 'date',
					isImportant: false,
				},
			],
		},
	};

	test('fulfilled', async () => {
		const data = {
			...state.notes?.notes?.filter((el) => el?.id === 'note id')[0],
			isDisable: !state.notes?.notes?.filter((el) => el?.id === 'note id')[0]?.isDisable,
			isImportant: false,
		};

		const thunk = new TestAsyncThunk(disableNote, state);
		thunk.api.put.mockReturnValue(Promise.resolve({data, statusText: 'OK'}));
		const result = await thunk.callThunk({userId: 'user id', noteId: 'note id'});

		expect(thunk.api.put).toHaveBeenCalled();
		expect(result.meta.requestStatus).toEqual('fulfilled');
		expect(result.payload).toEqual('note id');
	});

	test('rejected', async () => {
		const thunk = new TestAsyncThunk(disableNote, state);
		thunk.api.put.mockReturnValue(Promise.resolve({status: 403}));
		const result = await thunk.callThunk({userId: 'user id', noteId: 'note id'});

		expect(thunk.api.put).toHaveBeenCalled();
		expect(result.meta.requestStatus).toEqual('rejected');
	});
});
