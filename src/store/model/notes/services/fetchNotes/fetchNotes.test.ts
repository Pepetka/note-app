import {describe, expect, test} from '@jest/globals';
import {TestAsyncThunk} from 'shared/helpers/test/asyncThunk/asyncThunk';
import {fetchNotes} from './fetchNotes';
import {ResponseType} from '../types';

describe('fetchNotes', () => {
	test('fulfilled', async () => {
		const data: ResponseType = {
			'some note id 1': {
				order: 0,
				isImportant: false,
				date: 'date',
				title: 'title',
				isDisable: false,
			},
			'some note id 2': {
				order: 0,
				isImportant: false,
				date: 'date',
				title: 'title',
				isDisable: false,
			},
		};

		const thunk = new TestAsyncThunk(fetchNotes);
		thunk.api.get.mockReturnValue(Promise.resolve({data, statusText: 'OK'}));
		const result = await thunk.callThunk('some user id');

		expect(thunk.api.get).toHaveBeenCalled();
		expect(result.meta.requestStatus).toEqual('fulfilled');
		expect(result.payload).toEqual(
			Object.entries(data)
				.map((el) => ({...el[1], id: el[0]}))
				.sort((a, b) => a.order - b.order),
		);
	});

	test('fulfilled with empty data', async () => {
		const data: ResponseType = {};

		const thunk = new TestAsyncThunk(fetchNotes);
		thunk.api.get.mockReturnValue(Promise.resolve({data, statusText: 'OK'}));
		const result = await thunk.callThunk('some user id');

		expect(thunk.api.get).toHaveBeenCalled();
		expect(result.meta.requestStatus).toEqual('fulfilled');
		expect(result.payload).toEqual([]);
	});

	test('rejected', async () => {
		const thunk = new TestAsyncThunk(fetchNotes);
		thunk.api.get.mockReturnValue(Promise.resolve({status: 403}));
		const result = await thunk.callThunk('some user id');

		expect(thunk.api.get).toHaveBeenCalled();
		expect(result.meta.requestStatus).toEqual('rejected');
	});
});
