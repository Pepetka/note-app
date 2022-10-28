import {describe, expect, test} from '@jest/globals';
import {getNoteFormState} from './getNoteFormState';
import {StateSchema} from '../../../types/StateSchema';

describe('getNoteFormState', () => {
	const state: DeepPartial<StateSchema> = {
		noteForm: {
			noteTitle: 'some title',
			noteContent: 'some content',
			error: 'some error',
		},
	};

	test('return note form state', () => {
		expect(getNoteFormState(state as StateSchema)).toEqual({
			noteTitle: 'some title',
			noteContent: 'some content',
			error: 'some error',
		});
	});
});
