import {useTranslation} from 'react-i18next';

export const AboutPage = () => {
	const {t} = useTranslation('about');

	return (
		<div className='h-100 p-5 border rounded-3 primary-bg primary-text'>
			<h2>{t('About Note App')}</h2>
			<p>
				<strong>{t('App version')} </strong> {t('v3.2.0')}
				<br />
				<strong>{t('Description')} </strong>
				{t('App description')}
			</p>
		</div>
	);
};
