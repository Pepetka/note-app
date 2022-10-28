import {describe, expect, test} from '@jest/globals';
import {getText} from './getText';
import {StateSchema} from '../../../types/StateSchema';

describe('getText', () => {
	const state: DeepPartial<StateSchema> = {
		alert: {
			text: 'text',
			type: 'success',
			visible: true,
		},
	};

	test('return alert text', () => {
		expect(getText(state as StateSchema)).toEqual('text');
	});
});
