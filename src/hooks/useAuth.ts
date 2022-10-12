import {getUser} from 'store/user/selectors/getUser/getUser';
import {useSelector} from 'react-redux';

export function useAuth() {
	const user = useSelector(getUser);

	return {
		isAuth: !!user,
	};
}
