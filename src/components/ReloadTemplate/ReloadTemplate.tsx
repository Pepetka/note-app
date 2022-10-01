import React from 'react';
import {useAppSelector} from 'hooks/useRedux';
import {useTranslation} from 'react-i18next';

import './ReloadTemplate.scss';

interface ReloadTemplateProps {
	onReload: () => void
}
export const ReloadTemplate = ({onReload}: ReloadTemplateProps) => {
	const {error} = useAppSelector((state) => state.firebase);
	const {t} = useTranslation('home');

	return (
		<div className='fetchError'>
			<h1>{error.get}</h1>
			<button className='button fetchError__button' onClick={onReload}>
				{t('Click to reload notes')}
			</button>
		</div>
	);
};
