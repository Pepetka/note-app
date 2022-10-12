import {getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth';
import {Link, useNavigate} from 'react-router-dom';
import {AuthForm, SubmitArgs} from 'components/AuthForm/AuthForm';
import {userActions} from 'store/user/slice/userSlice';
import {alertActions} from 'store/alert/slice/alertSlice';
import {toUpperFirs} from 'helpers/toUpperFirst/toUpperFirst';
import {useTranslation} from 'react-i18next';
import {Button, ButtonThemes} from 'lib/Button/Button';
import {User} from 'store/user/types/UserSchema';
import {useAppDispatch} from 'hooks/useRedux';

import cls from './Login.module.scss';

export const Login = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const {t} = useTranslation('auth');

	const onShowAlert = (text: string) => {
		dispatch(
			alertActions.showAlert({
				text,
				type: 'danger',
			}),
		);

		setTimeout(() => {
			dispatch(alertActions.hideAlert());
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
					email: user.email!,
					id: user.uid,
					token: user.refreshToken,
				};

				dispatch(userActions.setUser(userData));

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
					id: result.user.uid,
					token: result.user.refreshToken,
					email: result.user.email!,
				};

				dispatch(userActions.setUser(user));

				localStorage.setItem('user', JSON.stringify(user));

				navigate('/');
			})
			.catch((error) => {
				dispatch(
					alertActions.showAlert({
						message: error.message,
						alertType: 'danger',
					}),
				);
			});
	};

	return (
		<div className={cls.Login} data-testid='Login'>
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
