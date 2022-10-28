import {describe, expect, test} from '@jest/globals';
import {getAlertState} from './getAlertState';
import {StateSchema} from '../../../types/StateSchema';

describe('getAlertState', () => {
	const state: DeepPartial<StateSchema> = {
		alert: {
			text: 'text',
			type: 'success',
			visible: true,
		},
	};

	test('return alert state', () => {
		expect(getAlertState(state as StateSchema)).toEqual({
			text: 'text',
			type: 'success',
			visible: true,
		});
	});
});
