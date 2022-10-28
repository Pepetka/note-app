import {describe, expect, test} from '@jest/globals';
import {getUser} from './getUser';
import {StateSchema} from '../../../types/StateSchema';

describe('getUser', () => {
	const state: DeepPartial<StateSchema> = {
		user: {
			user: {
				email: 'email@mail.ru',
				token: 'token',
				id: 'useId',
			},
		},
	};

	test('return user', () => {
		expect(getUser(state as StateSchema)).toEqual({
			email: 'email@mail.ru',
			token: 'token',
			id: 'useId',
		});
	});
});
