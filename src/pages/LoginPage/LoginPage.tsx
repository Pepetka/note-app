import {Link, useNavigate} from 'react-router-dom';
import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import {Login} from 'components/Login/Login';
import {useAppDispatch} from 'hooks/useRedux';
import {setUser} from 'store/slices/userSlice';
import {User} from 'types';
import {showAlert} from 'store/slices/alertSlice';
import {useTranslation} from 'react-i18next';

export const LoginPage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const {t} = useTranslation('auth');

	const onLogin = () => {
		const provider = new GoogleAuthProvider();
		const auth = getAuth();

		signInWithPopup(auth, provider)
			.then((result) => {
				const user: User = {
					id: result!.user.uid,
					token: result!.user.refreshToken,
					email: result!.user.email,
				};

				dispatch(setUser(user));

				localStorage.setItem('user', JSON.stringify(user));

				navigate('/');
			})
			.catch((error) => {
				dispatch(
					showAlert({
						message: error.message,
						alertType: 'danger',
					}),
				);
			});
	};

	return (
		<>
			<h1>{t('Login')}</h1>

			<Login />

			<p>
				{t('Or')} <Link to='/register'>{t('register')}</Link>
			</p>

			<button
				onClick={onLogin}
				type='button'
				className='btn btn-outline-primary w-100 mt-3 primary-bg primary-text'
			>
				{t('Login with Google')}
			</button>
		</>
	);
};
