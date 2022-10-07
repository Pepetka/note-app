import {useTranslation} from 'react-i18next';

import cls from './About.module.scss';

interface AboutProps {
	version?: string
}

export const About = ({version = 'v6.0.0'}: AboutProps) => {
	const {t} = useTranslation('about');

	return (
		<div className={cls.About}>
			<h2 className={cls.title}>{t('About Note App')}</h2>
			<p className={cls.text}>
				<strong className={cls.strong}>{t('App version')}</strong> {version}
				<br />
				<strong className={cls.strong}>{t('Description')}</strong> {' '}
				{t('App description')}
			</p>
		</div>
	);
};
