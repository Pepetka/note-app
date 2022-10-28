import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import {Button, ButtonThemes} from 'lib/Button/Button';
import {memo, useCallback} from 'react';

import cls from './NotFoundPage.module.scss';

const NotFoundPage = memo(() => {
	const {t} = useTranslation();
	const navigate = useNavigate();

	const onNavigate = useCallback(() => {
		navigate('/');
	}, [navigate]);

	return (
		<div className={cls.NotFoundPage} data-testid='NotFoundPage'>
			<h1>{t('Page not found')}</h1>
			<Button
				theme={ButtonThemes.PRIMARY}
				onClick={onNavigate}
			>
				{t('To main')}
			</Button>
		</div>
	);
});

export default NotFoundPage;
