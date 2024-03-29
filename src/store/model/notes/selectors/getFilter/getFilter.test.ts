import {describe, expect, test} from '@jest/globals';
import {getFilter} from './getFilter';
import {StateSchema} from '../../../types/StateSchema';
import {FilterTypes} from 'store/model/notes/types/NotesSchema';

describe('getFilter', () => {
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

	test('return notes filter', () => {
		expect(getFilter(state as StateSchema)).toEqual(FilterTypes.ALL);
	});
});
