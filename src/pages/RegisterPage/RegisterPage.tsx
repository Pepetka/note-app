import {Register} from 'components/Register/Register';
import {useTranslation} from 'react-i18next';
import {memo} from 'react';

const RegisterPage = memo(() => {
	const {t} = useTranslation('auth');

	return (
		<div data-testid='RegisterPage'>
			<h1>{t('Register')}</h1>

			<Register />
		</div>
	);
});

export default RegisterPage;
