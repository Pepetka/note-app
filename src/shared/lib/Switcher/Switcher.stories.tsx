import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Switcher} from './Switcher';

export default {
	title: 'lib/Switcher',
	component: Switcher,
	argTypes: {
		backgroundColor: {control: 'color'},
	},
} as ComponentMeta<typeof Switcher>;

const Template: ComponentStory<typeof Switcher> = (args) => <Switcher {...args} />;

export const SwitcherStory = Template.bind({});
SwitcherStory.args = {
	onclick: () => {},
	isActive: false,
};
