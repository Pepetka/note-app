import {describe, expect, test} from '@jest/globals';
import {userReducer, userActions} from './userSlice';
import {UserSchema} from '../types/UserSchema';

describe('userSlice', () => {
	test('remove user', () => {
		const state: UserSchema = {
			loading: false,
		};

		expect(userReducer(state, userActions.removeUser())).toEqual({
			loading: false,
		});
	});
});
