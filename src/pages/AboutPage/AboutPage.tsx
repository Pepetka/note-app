import {useTranslation} from 'react-i18next';
import {About} from 'components/About/About';
import {memo} from 'react';

interface AboutPageProps {
	version?: string
}

const AboutPage = memo(({version}: AboutPageProps) => {
	const {t} = useTranslation('about');

	return (
		<div data-testid='AboutPage'>
			<h1>{t('About App')}</h1>
			<About version={version} />
		</div>
	);
});

export default AboutPage;
