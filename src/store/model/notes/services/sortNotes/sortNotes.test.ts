import {describe, expect, test} from '@jest/globals';
import {TestAsyncThunk} from 'helpers/test/asyncThunk/asyncThunk';
import {sortNotes} from './sortNotes';
import {StateSchema} from '../../../types/StateSchema';
import {Note} from '../../types/NotesSchema';

describe('sortNotes', () => {
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
					order: 2,
					id: 'note id',
					content: 'content',
					isDisable: false,
					date: 'date',
					isImportant: false,
				},
			],
		},
	};

	const notes: Array<Note> = [
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
			order: 2,
			id: 'note id',
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
	];

	test('fulfilled', async () => {
		const thunk = new TestAsyncThunk(sortNotes, state);
		thunk.api.put.mockReturnValue(Promise.resolve({statusText: 'OK'}));
		const result = await thunk.callThunk({userId: 'user id', notes});

		expect(thunk.api.put).toHaveBeenCalled();
		expect(result.meta.requestStatus).toEqual('fulfilled');
		expect(result.payload).toEqual([
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
				id: 'note id',
				content: 'content',
				isDisable: false,
				date: 'date',
				isImportant: false,
			},
			{
				title: 'tile1',
				order: 2,
				id: 'id 2',
				content: 'content',
				isDisable: false,
				date: 'date',
				isImportant: false,
			},
		]);
	});
});
