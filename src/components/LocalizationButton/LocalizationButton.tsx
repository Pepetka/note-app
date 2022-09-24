import {useTranslation} from 'react-i18next';
import {useEffect} from 'react';

export const LocalizationButton = () => {
	const {i18n} = useTranslation();

	useEffect(() => {
		const lang = localStorage.getItem('i18nextLng');

		if (lang) {
			i18n.changeLanguage(lang);
			document.documentElement.lang = lang;
		}

		// eslint-disable-next-line
	}, []);


	const onChangeLang = () => {
		const newLang = i18n.language === 'en' ? 'ru' : 'en';

		i18n.changeLanguage(newLang);
		document.documentElement.lang = newLang;
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
