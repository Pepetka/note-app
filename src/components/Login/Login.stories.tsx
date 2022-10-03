import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Login} from './Login';

export default {
	title: 'components/Login',
	component: Login,
	argTypes: {
		backgroundColor: {control: 'color'},
	},
} as ComponentMeta<typeof Login>;

const Template: ComponentStory<typeof Login> = (args) => <Login />;

export const LoginStory = Template.bind({});
LoginStory.args = {};
