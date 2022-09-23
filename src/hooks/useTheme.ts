import {useContext} from 'react';
import {LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext} from 'themes/context/ThemeContext';

export interface ThemeHook {
	theme: Theme
	onThemeChange: () => void
}

export const useTheme = (): ThemeHook => {
	const {theme, setTheme} = useContext(ThemeContext);

	const onThemeChange = () => {
		const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;

		setTheme(newTheme);

		localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
	};

	return {
		theme: theme,
		onThemeChange,
	};
};
