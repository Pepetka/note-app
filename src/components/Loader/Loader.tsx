import {useTranslation} from 'react-i18next';

export const Loader = () => {
	const {t} = useTranslation();

	return (
		<div className='text-center'>
			<div className='spinner-border primary-text' role='status'>
				<span className='visually-hidden'>{t('Loading')}...</span>
			</div>
		</div>
	);
};
