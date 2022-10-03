import {ComponentMeta, ComponentStory} from '@storybook/react';
import {LocalizationButton} from './LocalizationButton';

export default {
	title: 'components/LocalizationButton',
	component: LocalizationButton,
	argTypes: {
		backgroundColor: {control: 'color'},
	},
} as ComponentMeta<typeof LocalizationButton>;

const Template: ComponentStory<typeof LocalizationButton> = (args) => <LocalizationButton />;

export const LocalizationButtonStory = Template.bind({});
LocalizationButtonStory.args = {};
