import {describe, expect, test} from '@jest/globals';
import {FilterTypes} from 'store/model/notes/types/NotesSchema';
import {StateSchema} from '../../../types/StateSchema';
import {getNotesState} from './getNotesState';

describe('getNotesState', () => {
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

	test('return notes state', () => {
		expect(getNotesState(state as StateSchema)).toEqual({
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
		});
	});
});
