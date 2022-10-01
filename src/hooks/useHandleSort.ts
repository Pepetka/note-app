import {useContext} from 'react';
import {HandleSortContext} from 'context/handleSort/HandleSortContext';

export interface HandleSortHook {
	handleSort: boolean
	onHandleSort: () => void
}

export const useHandleSort = (): HandleSortHook => {
	const {handleSort, setHandleSort} = useContext(HandleSortContext);

	const onHandleSort = () => {
		setHandleSort((handleSort) => !handleSort);
	};

	return {
		handleSort,
		onHandleSort,
	};
};
