import {DecoratorFn, Story} from '@storybook/react';
import {useEffect} from 'react';
import {Theme} from 'context/theme/ThemeContext';
import {useTheme} from 'hooks/useTheme';
import {ThemeProvider} from 'context/theme/ThemeProvider';

import 'style/index.scss';
import './Storybook.scss';

const StoryComponentWithTheme = ({StoryComponent, globalTheme}: {StoryComponent: Story, globalTheme: Theme}) => {
	const {setTheme, theme} = useTheme();

	useEffect(() => {
		setTheme(globalTheme);
	}, [globalTheme, setTheme]);

	return (
		<div className={`App ${theme}`}>
			<StoryComponent/>
		</div>
	);
};

export const StyleDecorator: DecoratorFn = (StoryComponent, {globals}) => {
	const {globalTheme} = globals;

	if (globalTheme === 'side-by-side') {
		return (
			<div className="storybook">
				<div className="storybook__wrapper">
					<ThemeProvider>
						<StoryComponentWithTheme StoryComponent={StoryComponent} globalTheme={Theme.LIGHT} />
					</ThemeProvider>
				</div>
				<div className="storybook__wrapper">
					<ThemeProvider>
						<StoryComponentWithTheme StoryComponent={StoryComponent} globalTheme={Theme.DARK} />
					</ThemeProvider>
				</div>
			</div>
		);
	}

	return (
		<div className='storybook'>
			<ThemeProvider>
				<StoryComponentWithTheme StoryComponent={StoryComponent} globalTheme={globalTheme} />
			</ThemeProvider>
		</div>
	);
};
