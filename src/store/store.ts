import {configureStore, ReducersMapObject} from '@reduxjs/toolkit';
import {alertReducer} from './alert/slice/alertSlice';
import {notesReducer} from './notes/slice/notesSlice';
import {userReducer} from './user/slice/userSlice';
import {StateSchema} from './types/StateSchema';
import {$api} from 'api/api';

export const configureReduxStore = (initialState?: StateSchema) => {
	const rootReducer: ReducersMapObject<StateSchema> = {
		alert: alertReducer,
		notes: notesReducer,
		user: userReducer,
	};

	return configureStore({
		reducer: rootReducer,
		preloadedState: initialState,
		middleware: (getDefaultMiddleware) => getDefaultMiddleware({
			thunk: {
				extraArgument: {
					api: $api,
				},
			},
		}),
	});
};

export type AppDispatch = ReturnType<typeof configureReduxStore>['dispatch'];

