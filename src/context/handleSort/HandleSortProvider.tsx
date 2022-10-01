import {ReactNode, useMemo, useState} from 'react';
import {HandleSortContext} from './HandleSortContext';

type HandleSortProviderProps = {
	children?: ReactNode
}

export const HandleSortProvider = ({children}: HandleSortProviderProps) => {
	const [handleSort, setHandleSort] = useState(false);

	const handleSortValue = useMemo(
		() => ({
			handleSort,
			setHandleSort,
		}),
		[handleSort],
	);

	return <HandleSortContext.Provider value={handleSortValue}>{children}</HandleSortContext.Provider>;
};
