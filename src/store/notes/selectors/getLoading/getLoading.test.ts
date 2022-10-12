import {describe, expect, test} from '@jest/globals';
import {getLoading} from './getLoading';
import {DeepPartial} from '@reduxjs/toolkit';
import {StateSchema} from '../../../types/StateSchema';
import {FilterTypes} from '../../types/NotesSchema';

describe('getLoading', () => {
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

	test('return notes loading', () => {
		expect(getLoading(state as StateSchema)).toEqual(false);
	});
});
