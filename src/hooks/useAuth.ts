import {getUser} from 'store/user/selectors/getUser/getUser';
import {useSelector} from 'react-redux';

export function useAuth() {
	const {email, token, id} = useSelector(getUser);

	return {
		isAuth: !!id,
		email,
		token,
		id,
	};
}
