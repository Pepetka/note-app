import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Button, ButtonThemes} from 'components/lib/Button/Button';

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
		<Button
			onClick={onChangeLang}
			className='localizationButton'
			theme={ButtonThemes.CIRCLE}
		>
			{i18n.language}
		</Button>
	);
};
