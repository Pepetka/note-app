import {describe, expect, test} from '@jest/globals';
import {TestAsyncThunk} from 'shared/helpers/test/asyncThunk/asyncThunk';
import {setContent} from './setContent';
import {StateSchema} from '../../../types/StateSchema';

describe('setContent', () => {
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
		const thunk = new TestAsyncThunk(setContent, state);
		thunk.api.put.mockReturnValue(Promise.resolve({statusText: 'OK'}));
		const result = await thunk.callThunk({userId: 'user id', noteId: 'note id', content: 'some content'});

		expect(thunk.api.put).toHaveBeenCalled();
		expect(result.meta.requestStatus).toEqual('fulfilled');
		expect(result.payload).toEqual({noteId: 'note id', content: 'some content'});
	});

	test('rejected', async () => {
		const thunk = new TestAsyncThunk(setContent, state);
		thunk.api.put.mockReturnValue(Promise.resolve({status: 403}));
		const result = await thunk.callThunk({userId: 'user id', noteId: 'note id', content: 'some content'});

		expect(thunk.api.put).toHaveBeenCalled();
		expect(result.meta.requestStatus).toEqual('rejected');
	});
});
