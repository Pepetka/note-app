import {useTheme} from 'hooks/useTheme';
import {Button, ButtonThemes} from 'lib/Button/Button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMoon, faSun} from '@fortawesome/free-solid-svg-icons';
import {Theme} from 'context/theme/ThemeContext';

export const ThemeButton = () => {
	const {theme, onThemeChange} = useTheme();

	return (
		<Button
			onClick={onThemeChange}
			theme={ButtonThemes.CIRCLE}
			testid='ThemeButton'
		>
			{theme === Theme.DARK ? (
				<FontAwesomeIcon data-testid='ThemeButton_moon' icon={faMoon} />
			) : (
				<FontAwesomeIcon data-testid='ThemeButton_sun' icon={faSun} />
			)}
		</Button>
	);
};
