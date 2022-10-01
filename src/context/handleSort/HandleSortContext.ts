import {createContext} from 'react';

export interface HandleSortContextProps {
	handleSort: boolean
	setHandleSort: (handleSort: (handleSort: boolean) => boolean) => void
}

export const HandleSortContext = createContext<HandleSortContextProps>({
	handleSort: false,
	setHandleSort: () => {},
});
