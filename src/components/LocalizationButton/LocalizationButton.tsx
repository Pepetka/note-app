import {memo, useCallback, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Button, ButtonThemes} from 'shared/lib/Button/Button';
import {LocalStorageKeys} from 'shared/const/localStorage';
import {Lang} from 'localization/i18n';

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
		const newLang = i18n.language === Lang.EN ? Lang.RU : Lang.EN;

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
