import {Login} from 'components/Login/Login';
import {useTranslation} from 'react-i18next';

const LoginPage = () => {
	const {t} = useTranslation('auth');

	return (
		<div className='loginPage' data-testid='LoginPage'>
			<h1>{t('Login')}</h1>

			<Login />
		</div>
	);
};

export default LoginPage;
