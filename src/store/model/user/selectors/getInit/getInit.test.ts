import {describe, expect, test} from '@jest/globals';
import {getInit} from './getInit';
import {StateSchema} from '../../../types/StateSchema';

describe('getInit', () => {
	const state: DeepPartial<StateSchema> = {
		user: {
			_init: true,
		},
	};

	test('return user init', () => {
		expect(getInit(state as StateSchema)).toEqual(true);
	});
});
