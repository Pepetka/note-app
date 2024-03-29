import {createContext} from 'react';

export enum Theme {
	DARK = 'dark_theme',
	LIGHT = 'light_theme',
}

export interface ThemeContextProps {
	theme: Theme
	setTheme: (theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContextProps>({
	theme: Theme.DARK,
	setTheme: () => {},
});
