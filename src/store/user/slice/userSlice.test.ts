import {describe, expect, test} from '@jest/globals';
import userReducer, {userActions} from './userSlice';
import {UserSchema} from '../types/UserSchema';

describe('userSlice', () => {
	test('set user', () => {
		const state: UserSchema = {
			user: null,
			error: null,
			loading: false,
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
			error: null,
			loading: false,
		});
	});

	test('remove user', () => {
		const state: UserSchema = {
			user: null,
			error: null,
			loading: false,
		};

		expect(userReducer(state, userActions.removeUser())).toEqual({
			user: null,
			error: null,
			loading: false,
		});
	});

	test('undefined state', () => {
		expect(userReducer(undefined, userActions.removeUser())).toEqual({
			user: null,
			error: null,
			loading: false,
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
			error: null,
			loading: false,
		});
	});
});
