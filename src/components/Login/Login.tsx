import {getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth';
import {useAppDispatch} from 'hooks/useRedux';
import {Link, useNavigate} from 'react-router-dom';
import {AuthForm, SubmitArgs} from 'components/AuthForm/AuthForm';
import {setUser} from 'store/slices/userSlice';
import {hideAlert, showAlert} from 'store/slices/alertSlice';
import {User} from 'types';
import {toUpperFirs} from 'helpers/toUpperFirst/toUpperFirst';
import {useTranslation} from 'react-i18next';
import {Button, ButtonThemes} from 'lib/Button/Button';

import cls from './Login.module.scss';

export const Login = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const {t} = useTranslation('auth');

	const onShowAlert = (text: string) => {
		dispatch(
			showAlert({
				text,
				type: 'danger',
			}),
		);

		setTimeout(() => {
			dispatch(hideAlert());
		}, 5000);
	};

	const handleLogin = ({
		email,
		password,
		rememberMe,
	}: SubmitArgs) => {
		const auth = getAuth();

		signInWithEmailAndPassword(auth, email, password)
			.then(({user}) => {
				const userData: User = {
					email: user.email,
					id: user.uid,
					token: user.refreshToken,
				};

				dispatch(setUser(userData));

				if (rememberMe) localStorage.setItem('user', JSON.stringify(userData));

				navigate('/');
			})
			.catch((error) => {
				onShowAlert(toUpperFirs(error.message));
			});
	};

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
		<div className={cls.Login}>
			<AuthForm title='Login' onSubmitForm={handleLogin} />
			<p>
				{t('Or')} <Link to='/register'>{t('register')}</Link>
			</p>

			<Button
				onClick={onLogin}
				theme={ButtonThemes.PRIMARY}
				className={cls.button}
			>
				{t('Login with Google')}
			</Button>
		</div>);
};
