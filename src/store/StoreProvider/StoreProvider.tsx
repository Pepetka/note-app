import {ReactNode} from 'react';
import {configureReduxStore} from '../store';
import {Provider} from 'react-redux';
import {StateSchema} from '../types/StateSchema';

interface StoreProviderProps {
	children?: ReactNode;
	initialState?: StateSchema
}

export const StoreProvider = ({children, initialState}: StoreProviderProps) => {
	const store = configureReduxStore(initialState);

	return (
		<Provider store={store}>
			{children}
		</Provider>
	);
};
