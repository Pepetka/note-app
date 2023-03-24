import {useContext} from 'react';
import {Theme, ThemeContext} from 'context/theme/ThemeContext';
import {LocalStorageKeys} from 'shared/const/localStorage';

export interface ThemeHook {
	theme: Theme
	onThemeChange: () => void
	setTheme: (theme: Theme) => void
}

/**
 * Хук, возвращающий тему приложения и функции для изменения темы
 */
export const useTheme = (): ThemeHook => {
	const {theme, setTheme} = useContext(ThemeContext);

	const onThemeChange = () => {
		const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;

		setTheme(newTheme);

		localStorage.setItem(LocalStorageKeys.THEME, newTheme);
	};

	return {
		theme: theme,
		onThemeChange,
		setTheme,
	};
};
