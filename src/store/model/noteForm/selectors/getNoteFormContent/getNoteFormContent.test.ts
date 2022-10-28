import {describe, expect, test} from '@jest/globals';
import {getNoteFormContent} from './getNoteFormContent';
import {StateSchema} from '../../../types/StateSchema';

describe('getNoteFormContent', () => {
	const state: DeepPartial<StateSchema> = {
		noteForm: {
			noteContent: 'some content',
		},
	};

	test('return note form content', () => {
		expect(getNoteFormContent(state as StateSchema)).toEqual('some content');
	});
});
