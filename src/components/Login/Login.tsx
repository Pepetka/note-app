import {useEffect} from 'react';
import {useAuth} from 'hooks/useAuth';
import {Link, useNavigate} from 'react-router-dom';
import {AuthForm, SubmitArgs} from 'components/AuthForm/AuthForm';
import {useTranslation} from 'react-i18next';
import {Button, ButtonThemes} from 'lib/Button/Button';
import {useAppDispatch} from 'hooks/useRedux';
import {loginWithPassword} from 'store/user/services/loginWithPassword/loginWithPassword';
import {loginWithGoogle} from 'store/user/services/loginWithGoogle/loginWithGoogle';

import cls from './Login.module.scss';

export const Login = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const {t} = useTranslation('auth');
	const {isAuth} = useAuth();

	useEffect(() => {
		if (isAuth) navigate('/');
	}, [isAuth, navigate]);

	const handleLogin = ({
		email,
		password,
		rememberMe,
	}: SubmitArgs) => {
		dispatch(loginWithPassword({email, password, rememberMe}));
	};

	const onLogin = () => {
		dispatch(loginWithGoogle());
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
