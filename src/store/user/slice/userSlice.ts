import {createSlice} from '@reduxjs/toolkit';
import {UserSchema} from '../types/UserSchema';

const initialState: UserSchema = {
	user: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action) {
			state.user = action.payload;
		},
		removeUser(state) {
			state.user = null;
		},
	},
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
