import React from 'react';
import {useTranslation} from 'react-i18next';
import {Button, ButtonThemes} from 'lib/Button/Button';
import {getError} from 'store/notes/selectors/getError/getError';
import {useAppSelector} from 'hooks/useRedux';

import cls from './ReloadTemplate.module.scss';

interface ReloadTemplateProps {
	onReload: () => void
	errorMessage?: string
}

export const ReloadTemplate = ({onReload, errorMessage}: ReloadTemplateProps) => {
	const error = useAppSelector(getError);
	const {t} = useTranslation('home');

	return (
		<div className={cls.FetchError} data-testid='ReloadTemplate'>
			<h1>{errorMessage ?? error.get}</h1>
			<Button
				onClick={onReload}
				theme={ButtonThemes.PRIMARY}
			>
				{t('Click to reload notes')}
			</Button>
		</div>
	);
};
