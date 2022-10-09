import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {Link, useNavigate} from 'react-router-dom';
import {AuthForm} from 'components/AuthForm/AuthForm';
import {userActions} from 'store/user/slice/userSlice';
import {alertActions} from 'store/alert/slice/alertSlice';
import {toUpperFirs} from 'helpers/toUpperFirst/toUpperFirst';
import {useTranslation} from 'react-i18next';
import {useAppDispatch} from 'hooks/useRedux';

import cls from './Register.module.scss';

export const Register = () => {
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

	const handleRegister = ({
		email,
		password,
		rememberMe,
	}: {
		email: string
		password: string
		rememberMe: boolean
	}) => {
		const auth = getAuth();

		createUserWithEmailAndPassword(auth, email, password)
			.then(({user}) => {
				const userData = {
					email: user.email,
					id: user.uid,
					token: user.refreshToken,
				};

				dispatch(userActions.setUser(userData));

				if (rememberMe) localStorage.setItem('user', JSON.stringify(userData));

				navigate('/', {replace: true});
			})
			.catch((error) => {
				let errorMessage = error.message;
				const index = errorMessage.indexOf('/') + 1;
				console.log(error.message);

				errorMessage = errorMessage.slice(index, -2).split('-').join(' ');

				onShowAlert(toUpperFirs(errorMessage));
			});
	};

	return (
		<div className={cls.Register} data-testid='Register'>
			<AuthForm title='Register' onSubmitForm={handleRegister}/>
			<p>
				{t('Or')} <Link to='/login'>{t('login')}</Link>
			</p>
		</div>);
};
