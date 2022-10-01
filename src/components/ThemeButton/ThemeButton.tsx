import {useTheme} from 'hooks/useTheme';

import './ThemeButton.scss';

export const ThemeButton = () => {
	const {theme, onThemeChange} = useTheme();

	return (
		<button
			onClick={onThemeChange}
			className='themeButton'
		>
			{theme === 'dark' ? (
				<i className='fa-solid fa-moon'></i>
			) : (
				<i className='fa-solid fa-sun'></i>
			)}
		</button>
	);
};
