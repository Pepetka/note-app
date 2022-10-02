import {useTheme} from 'hooks/useTheme';
import {Button, ButtonThemes} from 'components/lib/Button/Button';

export const ThemeButton = () => {
	const {theme, onThemeChange} = useTheme();

	return (
		<Button
			onClick={onThemeChange}
			theme={ButtonThemes.CIRCLE}
		>
			{theme === 'dark' ? (
				<i className='fa-solid fa-moon'></i>
			) : (
				<i className='fa-solid fa-sun'></i>
			)}
		</Button>
	);
};
