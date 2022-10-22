import {ReactNode} from 'react';
import {configureReduxStore} from '../store';
import {Provider} from 'react-redux';
import {StateSchema} from '../types/StateSchema';
import {useNavigate} from 'react-router-dom';

interface StoreProviderProps {
	children?: ReactNode;
	initialState?: StateSchema
}

export const StoreProvider = ({children, initialState}: StoreProviderProps) => {
	const navigate = useNavigate();
	const store = configureReduxStore(initialState, navigate);

	return (
		<Provider store={store}>
			{children}
		</Provider>
	);
};
