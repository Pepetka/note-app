import {getUser} from 'store/model/user/selectors/getUser/getUser';
import {useSelector} from 'react-redux';
import {useMemo} from 'react';

/**
 * Хук, возвращающий флаг, показывающий авторизован ли пользователь
 */
export const useAuth = () => {
	const user = useSelector(getUser);

	return useMemo(() => ({
		isAuth: !!user,
	}), [user]);
};
