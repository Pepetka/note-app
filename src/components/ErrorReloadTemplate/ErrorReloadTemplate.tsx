import {useTheme} from 'hooks/useTheme';
import {useTranslation} from 'react-i18next';
import {classNames} from 'helpers/classNames/classNames';
import {ReloadTemplate} from 'components/ReloadTemplate/ReloadTemplate';

import cls from './ErrorReloadTemplate.module.scss';

export const ErrorReloadTemplate = () => {
	const {theme} = useTheme();
	const {t} = useTranslation();

	const onReload = () => {
		window.location.reload();
	};

	return (
		<div className={classNames(['ErrorBoundary', theme, cls.ErrorReloadTemplate])}>
			<ReloadTemplate errorMessage={t('Error loading page')} onReload={onReload} />
		</div>
	);
};
