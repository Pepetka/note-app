import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from 'hooks/useRedux';
import {fetchNotes} from 'store/slices/firebaseSlice';
import {useNavigate} from 'react-router-dom';
import {useAuth} from 'hooks/useAuth';
import {setUser} from 'store/slices/userSlice';
import {showAlert} from 'store/slices/alertSlice';
import {HomePagetemplate} from './HomePageTemplate';

export const HomePage = () => {
	const dispatch = useAppDispatch();
	const userId = useAppSelector((state) => state.user.user.id);
	const {error} = useAppSelector((state) => state.firebase);
	const navigate = useNavigate();
	const {isAuth} = useAuth();

	useEffect(() => {
		if (isAuth) {
			dispatch(fetchNotes(userId!));
		} else if (localStorage.getItem('user') !== null) {
			const user = localStorage.getItem('user');
			dispatch(setUser(JSON.parse(user!)));
		} else {
			navigate('/login');
		}
	}, [dispatch, isAuth, navigate, userId]);

	useEffect(() => {
		if (error.update) dispatch(showAlert({type: 'danger', text: error.update}));
	}, [dispatch, error.update]);

	return (
		<HomePagetemplate />
	);
};
