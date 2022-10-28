import {describe, expect, test} from '@jest/globals';
import {getNotes} from './getNotes';
import {StateSchema} from '../../../types/StateSchema';
import {FilterTypes} from 'store/model/notes/types/NotesSchema';

describe('getNotes', () => {
	const state: DeepPartial<StateSchema> = {
		notes: {
			notes: [
				{
					date: 'date',
					id: 'id',
					isDisable: false,
					order: 0,
					title: 'title',
					isImportant: true,
				},
			],
			error: {
				get: 'get error',
				update: 'update error',
			},
			loading: false,
			filter: FilterTypes.ALL,
		},
	};

	test('return notes', () => {
		expect(getNotes(state as StateSchema)).toEqual([
			{
				date: 'date',
				id: 'id',
				isDisable: false,
				order: 0,
				title: 'title',
				isImportant: true,
			},
		]);
	});
});
