import {ComponentMeta, ComponentStory} from '@storybook/react';
import {ThemeButton} from './ThemeButton';

export default {
	title: 'components/ThemeButton',
	component: ThemeButton,
	argTypes: {
		backgroundColor: {control: 'color'},
	},
} as ComponentMeta<typeof ThemeButton>;

const Template: ComponentStory<typeof ThemeButton> = (args) => <ThemeButton />;

export const ThemeButtonStory = Template.bind({});
ThemeButtonStory.args = {};
