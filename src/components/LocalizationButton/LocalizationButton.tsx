import {memo, useCallback, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Button, ButtonThemes} from 'lib/Button/Button';
import {LocalStorageKeys} from 'const/localStorage';

export const LocalizationButton = memo(() => {
	const {i18n} = useTranslation();

	useEffect(() => {
		const lang = localStorage.getItem(LocalStorageKeys.LANG);

		if (lang) {
			i18n.changeLanguage(lang);
			document.documentElement.lang = lang;
		}
	}, [i18n]);


	const onChangeLang = useCallback(() => {
		const newLang = i18n.language === 'en' ? 'ru' : 'en';

		i18n.changeLanguage(newLang);
		document.documentElement.lang = newLang;
	}, [i18n]);

	return (
		<Button
			onClick={onChangeLang}
			theme={ButtonThemes.CIRCLE}
			testid='LocalizationButton'
		>
			{i18n.language}
		</Button>
	);
});
