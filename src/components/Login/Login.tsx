import {Link, useNavigate} from 'react-router-dom';
import {AuthForm, SubmitArgs} from 'components/AuthForm/AuthForm';
import {useTranslation} from 'react-i18next';
import {Button, ButtonThemes} from 'lib/Button/Button';
import {useAppDispatch} from 'hooks/useRedux';
import {loginWithPassword} from 'store/model/user/services/loginWithPassword/loginWithPassword';
import {loginWithGoogle} from 'store/model/user/services/loginWithGoogle/loginWithGoogle';
import {memo, useCallback} from 'react';

import cls from './Login.module.scss';

export const Login = memo(() => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const {t} = useTranslation('auth');

	const handleLogin = useCallback(({email, password, rememberMe}: SubmitArgs) => {
		dispatch(loginWithPassword({
			email,
			password,
			rememberMe,
		}))
			.then(() => {
				navigate('/');
			});
	}, [dispatch, navigate]);

	const onLogin = useCallback(
		() => {
			dispatch(loginWithGoogle())
				.then(() => {
					navigate('/');
				});
		},
		[dispatch, navigate],
	);

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
});
