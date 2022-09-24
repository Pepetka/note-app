import {useTranslation} from 'react-i18next';

export const NotFoundPage = () => {
	const {t} = useTranslation();

	return (
		<div className='text-center'>
			<h1>{t('Page not found')}</h1>
		</div>
	);
};
