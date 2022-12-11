import {Link} from 'react-router-dom';
import {AuthForm, SubmitArgs} from 'components/AuthForm/AuthForm';
import {useTranslation} from 'react-i18next';
import {useAppDispatch} from 'shared/hooks/useRedux';
import {memo, useCallback} from 'react';
import {registerWithPassword} from 'store/model/user/services/registerWithPassword/registerWithPassword';

import cls from './Register.module.scss';

export const Register = memo(() => {
	const dispatch = useAppDispatch();
	const {t} = useTranslation('auth');

	const handleRegister = useCallback(({email, password, rememberMe}: SubmitArgs) => {
		dispatch(registerWithPassword({
			email,
			password,
			rememberMe,
		}));
	}, [dispatch]);

	return (
		<div className={cls.Register} data-testid='Register'>
			<AuthForm title='Register' onSubmitForm={handleRegister}/>
			<p>
				{t('Or')} <Link to='/login'>{t('login')}</Link>
			</p>
		</div>);
});
