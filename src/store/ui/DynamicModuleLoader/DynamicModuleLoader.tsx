import {ReactNode, useEffect} from 'react';
import {useDispatch, useStore} from 'react-redux';
import {Reducer} from '@reduxjs/toolkit';
import {ReduxStoreWithManager, StateSchemaKey} from 'store/model/types/StateSchema';

interface DynamicModuleLoaderProps {
	reducerKey: StateSchemaKey
	reducer: Reducer
	children: ReactNode
}

export const DynamicModuleLoader = ({children, reducer, reducerKey}: DynamicModuleLoaderProps) => {
	const store = useStore() as ReduxStoreWithManager;
	const dispatch = useDispatch();

	useEffect(() => {
		store.reducerManager.add(reducerKey, reducer);
		dispatch({type: `@INIT ${reducerKey} reducer`});

		return () => {
			store.reducerManager.remove(reducerKey);
			dispatch({type: `@DESTROY ${reducerKey} reducer`});
		};
	}, [dispatch, reducer, reducerKey, store.reducerManager]);

	return (
		// eslint-disable-next-line react/jsx-no-useless-fragment
		<>
			{children}
		</>
	);
};
