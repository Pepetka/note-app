import {useDispatch} from 'react-redux';
import {AppDispatch} from 'store/store';

/**
 * Типизированный useDispatch
 */
export const useAppDispatch: () => AppDispatch = useDispatch;
