import {useTranslation} from 'react-i18next';

import './About.scss';

export const About = () => {
	const {t} = useTranslation('about');

	return (
		<div className='about'>
			<h2 className='about__title'>{t('About Note App')}</h2>
			<p className='about__text'>
				<strong className='about__strong'>{t('App version')} </strong> {'v4.1.0'}
				<br />
				<strong className='about__strong'>{t('Description')} </strong>
				{t('App description')}
			</p>
		</div>
	);
};
