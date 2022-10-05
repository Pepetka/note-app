import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import {Button, ButtonThemes} from 'components/lib/Button/Button';

import cls from './NotFoundPage.module.scss';

const NotFoundPage = () => {
	const {t} = useTranslation();
	const navigate = useNavigate();

	const onNavigate = () => {
		navigate('/');
	};

	return (
		<div className={cls.NotFoundPage}>
			<h1>{t('Page not found')}</h1>
			<Button
				theme={ButtonThemes.PRIMARY}
				onClick={onNavigate}
			>
				{t('To main')}
			</Button>
		</div>
	);
};

export default NotFoundPage;
