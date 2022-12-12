import {getUser} from 'store/model/user/selectors/getUser/getUser';
import {useSelector} from 'react-redux';
import {useMemo} from 'react';

export const useAuth = () => {
	const user = useSelector(getUser);

	return useMemo(() => ({
		isAuth: !!user,
	}), [user]);
};
