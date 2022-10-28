import {describe, expect, test} from '@jest/globals';
import {getNoteFormTitle} from './getNoteFormTitle';
import {StateSchema} from '../../../types/StateSchema';

describe('getNoteFormTitle', () => {
	const state: DeepPartial<StateSchema> = {
		noteForm: {
			noteTitle: 'some title',
		},
	};

	test('return note form title', () => {
		expect(getNoteFormTitle(state as StateSchema)).toEqual('some title');
	});
});
