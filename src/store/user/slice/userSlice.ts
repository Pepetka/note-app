import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User, UserSchema} from '../types/UserSchema';
import {loginWithPassword} from '../services/loginWithPassword/loginWithPassword';
import {loginWithGoogle} from '../services/loginWithGoogle/loginWithGoogle';
import {registerWithPassword} from '../services/registerWithPassword/registerWithPassword';

const initialState: UserSchema = {
	user: null,
	error: null,
	loading: false,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<User>) {
			state.user = action.payload;
		},
		removeUser(state) {
			state.user = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginWithPassword.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loginWithPassword.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.user = action.payload;
			})
			.addCase(loginWithPassword.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload!;
			})
			.addCase(loginWithGoogle.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loginWithGoogle.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.user = action.payload;
			})
			.addCase(loginWithGoogle.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload!;
			})
			.addCase(registerWithPassword.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(registerWithPassword.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.user = action.payload;
			})
			.addCase(registerWithPassword.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload!;
			});
	},
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
