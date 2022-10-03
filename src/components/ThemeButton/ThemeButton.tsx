import {useTheme} from 'hooks/useTheme';
import {Button, ButtonThemes} from 'components/lib/Button/Button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMoon, faSun} from '@fortawesome/free-solid-svg-icons';

export const ThemeButton = () => {
	const {theme, onThemeChange} = useTheme();

	return (
		<Button
			onClick={onThemeChange}
			theme={ButtonThemes.CIRCLE}
		>
			{theme === 'dark' ? (
				<FontAwesomeIcon icon={faMoon}/>
			) : (
				<FontAwesomeIcon icon={faSun} />
			)}
		</Button>
	);
};
