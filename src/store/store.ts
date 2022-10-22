import {configureStore} from '@reduxjs/toolkit';
import alertReducer from './alert/slice/alertSlice';
import notesReducer from './notes/slice/notesSlice';
import userReducer from './user/slice/userSlice';
import {StateSchema} from './types/StateSchema';

export const configureReduxStore = (initialState?: StateSchema) => configureStore<StateSchema>({
	reducer: {
		alert: alertReducer,
		notes: notesReducer,
		user: userReducer,
	},
	preloadedState: initialState,
});

export type AppDispatch = ReturnType<typeof configureReduxStore>['dispatch'];

