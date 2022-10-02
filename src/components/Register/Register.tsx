import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {useAppDispatch} from 'hooks/useRedux';
import {Link, useNavigate} from 'react-router-dom';
import {AuthForm} from 'components/AuthForm/AuthForm';
import {setUser} from 'store/slices/userSlice';
import {showAlert, hideAlert} from 'store/slices/alertSlice';
import {toUpperFirs} from 'helpers/toUpperFirst';
import {useTranslation} from 'react-i18next';

import cls from './Register.module.scss';

export const Register = () => {
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

				dispatch(setUser(userData));

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
		<div className={cls.Register}>
			<AuthForm title='Register' onSubmitForm={handleRegister}/>
			<p>
				{t('Or')} <Link to='/login'>{t('login')}</Link>
			</p>
		</div>);
};
