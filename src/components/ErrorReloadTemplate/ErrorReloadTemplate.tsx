import {useTheme} from 'shared/hooks/useTheme';
import {useTranslation} from 'react-i18next';
import {classNames} from 'shared/helpers/classNames/classNames';
import {ReloadTemplate} from 'components/ReloadTemplate/ReloadTemplate';
import {memo, useCallback} from 'react';
import {HStack} from 'shared/lib/Flex/HStack';

export const ErrorReloadTemplate = memo(() => {
	const {theme} = useTheme();
	const {t} = useTranslation();

	const onReload = useCallback(() => {
		window.location.reload();
	}, []);

	return (
		<HStack justify='center' align='center' data-testid='ErrorReloadTemplate' className={classNames(['ErrorBoundary', theme])}>
			<ReloadTemplate errorMessage={t('Error loading page')} onReload={onReload} />
		</HStack>
	);
});
