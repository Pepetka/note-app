import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User, UserSchema} from '../types/UserSchema';
import {loginWithPassword} from '../services/loginWithPassword/loginWithPassword';
import {loginWithGoogle} from '../services/loginWithGoogle/loginWithGoogle';
import {registerWithPassword} from '../services/registerWithPassword/registerWithPassword';
import {LocalStorageKeys} from 'shared/const/localStorage';

const initialState: UserSchema = {
	loading: false,
	_init: false,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		initUser(state) {
			const user = localStorage.getItem(LocalStorageKeys.USER) ?? sessionStorage.getItem(LocalStorageKeys.USER);

			if (user) state.user = JSON.parse(user);
			state._init = true;
		},
		setUserLocal(state, action: PayloadAction<User>) {
			localStorage.setItem(LocalStorageKeys.USER, JSON.stringify(action.payload));
		},
		setUserSession(state, action: PayloadAction<User>) {
			sessionStorage.setItem(LocalStorageKeys.USER, JSON.stringify(action.payload));
		},
		removeUser(state) {
			state.user = undefined;
			localStorage.removeItem(LocalStorageKeys.USER);
			sessionStorage.removeItem(LocalStorageKeys.USER);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginWithPassword.pending, (state) => {
				state.loading = true;
				state.error = undefined;
			})
			.addCase(loginWithPassword.fulfilled, (state, action) => {
				state.loading = false;
				state.error = undefined;
				state.user = action.payload;
			})
			.addCase(loginWithPassword.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(loginWithGoogle.pending, (state) => {
				state.loading = true;
				state.error = undefined;
			})
			.addCase(loginWithGoogle.fulfilled, (state, action) => {
				state.loading = false;
				state.error = undefined;
				state.user = action.payload;
			})
			.addCase(loginWithGoogle.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(registerWithPassword.pending, (state) => {
				state.loading = true;
				state.error = undefined;
			})
			.addCase(registerWithPassword.fulfilled, (state, action) => {
				state.loading = false;
				state.error = undefined;
				state.user = action.payload;
			})
			.addCase(registerWithPassword.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
