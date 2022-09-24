import {Link} from 'react-router-dom';
import {Register} from 'components/Register/Register';
import {useTranslation} from 'react-i18next';

export const RegisterPage = () => {
	const {t} = useTranslation('auth');

	return (
		<>
			<h1>{t('Register')}</h1>

			<Register />

			<p>
				{t('Or')} <Link to='/login'>{t('login')}</Link>
			</p>
		</>
	);
};
