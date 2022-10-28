import {describe, expect, test} from '@jest/globals';
import {getNoteFormError} from './getNoteFormError';
import {StateSchema} from '../../../types/StateSchema';

describe('getNoteFormError', () => {
	const state: DeepPartial<StateSchema> = {
		noteForm: {
			error: 'some error',
		},
	};

	test('return note form error', () => {
		expect(getNoteFormError(state as StateSchema)).toEqual('some error');
	});
});
