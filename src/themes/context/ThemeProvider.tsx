import { ReactNode, useMemo, useState } from "react"
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from "./ThemeContext"

const defaultTheme: Theme = (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) ?? Theme.DARK

type ThemeProviderProps = {
	children?: ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
	const [theme, setTheme] = useState<Theme>(defaultTheme)

	const themeValue = useMemo(
		() => ({
			theme,
			setTheme,
		}),
		[theme]
	)

	return <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>
}
