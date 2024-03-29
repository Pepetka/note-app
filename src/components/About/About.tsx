import {useTranslation} from 'react-i18next';
import {memo} from 'react';

import cls from './About.module.scss';

interface AboutProps {
	version?: string
}

export const About = memo(({version = 'v7.0.0'}: AboutProps) => {
	const {t} = useTranslation('about');

	return (
		<div className={cls.About} data-testid='About'>
			<h2 className={cls.title}>{t('About Note App')}</h2>
			<p className={cls.text}>
				<strong className={cls.strong}>{t('App version')}</strong> <span>{version}</span>
				<br />
				<strong className={cls.strong}>{t('Description')}</strong> {' '}
				{t('App description')}
			</p>
		</div>
	);
});
