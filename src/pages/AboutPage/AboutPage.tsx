import {useTranslation} from 'react-i18next';
import {About} from 'components/About/About';

export const AboutPage = () => {
	const {t} = useTranslation('about');

	return (
		<>
			<h1>{t('About App')}</h1>
			<About/>
		</>
	);
};
