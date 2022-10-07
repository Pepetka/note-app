import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Input} from './Input';

export default {
	title: 'lib/Input',
	component: Input,
	argTypes: {
		backgroundColor: {control: 'color'},
	},
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const InputStory = Template.bind({});
InputStory.args = {
	placeholder: 'Input placeholder',
	onChange: () => { },
};
