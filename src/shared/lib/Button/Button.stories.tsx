import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Button, ButtonThemes} from './Button';

export default {
	title: 'lib/Button',
	component: Button,
	argTypes: {
		backgroundColor: {control: 'color'},
	},
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	theme: ButtonThemes.PRIMARY,
	children: 'Button',
};
export const PrimaryActive = Template.bind({});
PrimaryActive.args = {
	theme: ButtonThemes.PRIMARY,
	active: true,
	children: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
	theme: ButtonThemes.SECONDARY,
	children: 'Button',
};
export const SecondaryActive = Template.bind({});
SecondaryActive.args = {
	theme: ButtonThemes.SECONDARY,
	active: true,
	children: 'Button',
};

export const Clear = Template.bind({});
Clear.args = {
	theme: ButtonThemes.CLEAR,
	children: 'Button',
};

export const Circle = Template.bind({});
Circle.args = {
	theme: ButtonThemes.CIRCLE,
	children: 'Button',
};
