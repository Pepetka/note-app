import {ReactNode, useMemo, useState} from 'react';
import {Theme, ThemeContext} from './ThemeContext';
import {LocalStorageKeys} from 'shared/const/localStorage';

const defaultTheme: Theme = (localStorage.getItem(LocalStorageKeys.THEME) as Theme) ?? Theme.DARK;

type ThemeProviderProps = {
	children?: ReactNode
}

export const ThemeProvider = ({children}: ThemeProviderProps) => {
	const [theme, setTheme] = useState<Theme>(defaultTheme);

	const themeValue = useMemo(
		() => ({
			theme,
			setTheme,
		}),
		[theme],
	);

	return <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>;
};
