import {describe, expect, test} from '@jest/globals';
import {getUserState} from './getUserState';
import {StateSchema} from '../../../types/StateSchema';

describe('getUserState', () => {
	const state: DeepPartial<StateSchema> = {
		user: {
			user: {
				email: 'email@mail.ru',
				token: 'token',
				id: 'useId',
			},
		},
	};

	test('return user state', () => {
		expect(getUserState(state as StateSchema)).toEqual({
			user: {
				email: 'email@mail.ru',
				token: 'token',
				id: 'useId',
			},
		});
	});
});
