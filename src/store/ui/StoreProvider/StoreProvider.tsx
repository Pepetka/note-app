import {ReactNode} from 'react';
import {configureReduxStore} from '../../store';
import {Provider} from 'react-redux';
import {StateSchema} from '../../model/types/StateSchema';
import {ReducersMapObject} from '@reduxjs/toolkit';

interface StoreProviderProps {
	children?: ReactNode;
	initialState?: StateSchema
	asyncReducers?: ReducersMapObject<StateSchema>
}

export const StoreProvider = ({children, initialState, asyncReducers}: StoreProviderProps) => {
	const store = configureReduxStore(initialState, asyncReducers);

	return (
		<Provider store={store}>
			{children}
		</Provider>
	);
};
