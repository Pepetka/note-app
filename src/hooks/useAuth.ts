import {useAppSelector} from './useRedux';

export function useAuth() {
	const {email, token, id} = useAppSelector((state) => state.user.user);

	return {
		isAuth: !!id,
		email,
		token,
		id,
	};
}
