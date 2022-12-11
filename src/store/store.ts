import {CombinedState, configureStore, Reducer, ReducersMapObject} from '@reduxjs/toolkit';
import {alertReducer} from './model/alert/slice/alertSlice';
import {notesReducer} from './model/notes/slice/notesSlice';
import {userReducer} from './model/user/slice/userSlice';
import {StateSchema} from './model/types/StateSchema';
import {$api} from 'shared/api/api';
import {createReducerManager} from './model/reducerManager/reducerManager';

export const configureReduxStore = (initialState?: StateSchema, asyncReducers?: ReducersMapObject<StateSchema>) => {
	const rootReducer: ReducersMapObject<StateSchema> = {
		alert: alertReducer,
		notes: notesReducer,
		user: userReducer,
		...asyncReducers,
	};

	const reducerManager = createReducerManager(rootReducer);

	const store = configureStore({
		reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
		preloadedState: initialState,
		middleware: (getDefaultMiddleware) => getDefaultMiddleware({
			thunk: {
				extraArgument: {
					api: $api,
				},
			},
		}),
	});

	// @ts-ignore
	store.reducerManager = reducerManager;

	return store;
};

export type AppDispatch = ReturnType<typeof configureReduxStore>['dispatch'];

