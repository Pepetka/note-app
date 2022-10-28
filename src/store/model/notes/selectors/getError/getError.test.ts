import {describe, expect, test} from '@jest/globals';
import {getError} from './getError';
import {StateSchema} from '../../../types/StateSchema';
import {FilterTypes} from 'store/model/notes/types/NotesSchema';

describe('getError', () => {
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

	test('return notes error', () => {
		expect(getError(state as StateSchema)).toEqual({
			get: 'get error',
			update: 'update error',
		});
	});
});
