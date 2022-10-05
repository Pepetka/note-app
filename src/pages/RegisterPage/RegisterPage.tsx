import {Register} from 'components/Register/Register';
import {useTranslation} from 'react-i18next';

const RegisterPage = () => {
	const {t} = useTranslation('auth');

	return (
		<>
			<h1>{t('Register')}</h1>

			<Register />
		</>
	);
};

export default RegisterPage;
