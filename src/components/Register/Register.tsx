import {Link, useNavigate} from 'react-router-dom';
import {AuthForm, SubmitArgs} from 'components/AuthForm/AuthForm';
import {useTranslation} from 'react-i18next';
import {useAppDispatch} from 'hooks/useRedux';
import {memo, useCallback, useEffect} from 'react';
import {useAuth} from 'hooks/useAuth';
import {registerWithPassword} from 'store/user/services/registerWithPassword/registerWithPassword';

import cls from './Register.module.scss';

export const Register = memo(() => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const {t} = useTranslation('auth');
	const {isAuth} = useAuth();

	useEffect(() => {
		if (isAuth) navigate('/');
	}, [isAuth, navigate]);

	const handleRegister = useCallback(({email, password, rememberMe}: SubmitArgs) => {
		dispatch(registerWithPassword({
			email,
			password,
			rememberMe,
		}))
			.then(() => {
				navigate('/');
			});
	}, [dispatch, navigate]);

	return (
		<div className={cls.Register} data-testid='Register'>
			<AuthForm title='Register' onSubmitForm={handleRegister}/>
			<p>
				{t('Or')} <Link to='/login'>{t('login')}</Link>
			</p>
		</div>);
});
