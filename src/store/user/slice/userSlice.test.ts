import {describe, expect, test} from '@jest/globals';
import userReducer, {userActions} from './userSlice';
import {UserSchema} from '../types/UserSchema';

describe('userSlice', () => {
	test('set user', () => {
		const state: UserSchema = {
			user: {
				token: null,
				id: null,
				email: null,
			},
		};

		expect(userReducer(state, userActions.setUser({
			token: 'token',
			id: 'userId',
			email: 'email.mail.ru',
		}))).toEqual({
			user: {
				token: 'token',
				id: 'userId',
				email: 'email.mail.ru',
			},
		});
	});

	test('remove user', () => {
		const state: UserSchema = {
			user: {
				token: null,
				id: null,
				email: null,
			},
		};

		expect(userReducer(state, userActions.removeUser())).toEqual({
			user: {
				token: null,
				id: null,
				email: null,
			},
		});
	});

	test('undefined state', () => {
		expect(userReducer(undefined, userActions.removeUser())).toEqual({
			user: {
				token: null,
				id: null,
				email: null,
			},
		});
		expect(userReducer(undefined, userActions.setUser({
			token: 'token',
			id: 'userId',
			email: 'email.mail.ru',
		}))).toEqual({
			user: {
				token: 'token',
				id: 'userId',
				email: 'email.mail.ru',
			},
		});
	});
});
