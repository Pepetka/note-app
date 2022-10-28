import {describe, expect, test} from '@jest/globals';
import {getVisible} from './getVisible';
import {StateSchema} from '../../../types/StateSchema';

describe('getVisible', () => {
	const state: DeepPartial<StateSchema> = {
		alert: {
			text: 'text',
			type: 'success',
			visible: true,
		},
	};

	test('return alert visible', () => {
		expect(getVisible(state as StateSchema)).toEqual(true);
	});
});
