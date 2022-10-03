import React from 'react';
import {useAppSelector} from 'hooks/useRedux';
import {useTranslation} from 'react-i18next';
import {Button, ButtonThemes} from 'components/lib/Button/Button';

import cls from './ReloadTemplate.module.scss';

interface ReloadTemplateProps {
	onReload: () => void
	storybookError?: 'Error message' | undefined
}
export const ReloadTemplate = ({onReload, storybookError}: ReloadTemplateProps) => {
	const {error} = useAppSelector((state) => state.firebase);
	const {t} = useTranslation('home');

	return (
		<div className={cls.FetchError}>
			<h1>{storybookError ?? error.get}</h1>
			<Button
				onClick={onReload}
				theme={ButtonThemes.PRIMARY}
			>
				{t('Click to reload notes')}
			</Button>
		</div>
	);
};
