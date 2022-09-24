import {useTranslation} from 'react-i18next';

export const LocalizationButton = () => {
	const {i18n} = useTranslation();

	const onChangeLang = () => {
		const newLang = i18n.language === 'en' ? 'ru' : 'en';

		i18n.changeLanguage(newLang);
	};

	return (
		<button
			onClick={onChangeLang}
			className='theme-button d-flex justify-content-center align-items-center secondary-bg secondary-text'
		>
			{i18n.language}
		</button>
	);
};
