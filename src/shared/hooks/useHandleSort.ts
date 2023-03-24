import {useContext} from 'react';
import {HandleSortContext} from 'context/handleSort/HandleSortContext';

export interface HandleSortHook {
	handleSort: boolean
	onHandleSort: () => void
}

/**
 * Хук, возвращающий флаг, показывающий включена ли ручная сортировка, и функцию, включающую/выключающую ручную
 * сортировку
 */
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
