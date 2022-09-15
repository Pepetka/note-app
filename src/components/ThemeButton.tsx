import { useTheme } from "hooks/theme-hooks"

const ThemeButton = () => {
	const { theme, onThemeChange } = useTheme()

	return (
		<button
			onClick={onThemeChange}
			className='theme-button d-flex justify-content-center align-items-center secondary-bg secondary-text'
		>
			{theme === "dark" ? (
				<i className='fa-solid fa-moon'></i>
			) : (
				<i className='fa-solid fa-sun'></i>
			)}
		</button>
	)
}

export default ThemeButton
