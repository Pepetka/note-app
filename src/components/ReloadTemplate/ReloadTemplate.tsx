import React from 'react';
import {useAppSelector} from 'hooks/useRedux';
import {useTranslation} from 'react-i18next';

interface ReloadTemplateProps {
	onReload: () => void
}
export const ReloadTemplate = ({onReload}: ReloadTemplateProps) => {
	const {error} = useAppSelector((state) => state.firebase);
	const {t} = useTranslation('home');

	return (
		<div className='d-flex justify-content-center align-items-center flex-column'>
			<h1>{error.get}</h1>
			<button className='btn btn-primary' onClick={onReload}>
				{t('Click to reload notes')}
			</button>
		</div>
	);
};
