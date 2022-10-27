import {describe, expect, test} from '@jest/globals';
import {getType} from './getType';
import {DeepPartial} from '@reduxjs/toolkit';
import {StateSchema} from '../../../types/StateSchema';

describe('getType', () => {
	const state: DeepPartial<StateSchema> = {
		alert: {
			text: 'text',
			type: 'success',
			visible: true,
		},
	};

	test('return alert type', () => {
		expect(getType(state as StateSchema)).toEqual('success');
	});
});
