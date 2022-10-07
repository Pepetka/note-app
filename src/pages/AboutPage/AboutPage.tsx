import {useTranslation} from 'react-i18next';
import {About} from 'components/About/About';

interface AboutPageProps {
	version?: string
}

const AboutPage = ({version}: AboutPageProps) => {
	const {t} = useTranslation('about');

	return (
		<>
			<h1>{t('About App')}</h1>
			<About version={version} />
		</>
	);
};

export default AboutPage;
