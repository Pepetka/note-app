import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Register} from './Register';

export default {
	title: 'components/Register',
	component: Register,
	argTypes: {
		backgroundColor: {control: 'color'},
	},
} as ComponentMeta<typeof Register>;

const Template: ComponentStory<typeof Register> = (args) => <Register />;

export const RegisterStory = Template.bind({});
RegisterStory.args = {};
