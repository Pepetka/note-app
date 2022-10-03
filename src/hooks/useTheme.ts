import {useContext} from 'react';
import {LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext} from 'context/theme/ThemeContext';

export interface ThemeHook {
	theme: Theme
	onThemeChange: () => void
	setTheme: (theme: Theme) => void
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
		setTheme,
	};
};
