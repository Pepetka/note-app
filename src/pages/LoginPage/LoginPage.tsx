import {Login} from 'components/Login/Login';
import {useTranslation} from 'react-i18next';

export const LoginPage = () => {
	const {t} = useTranslation('auth');

	return (
		<div className='loginPage'>
			<h1>{t('Login')}</h1>

			<Login />
		</div>
	);
};
