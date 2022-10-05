import {ComponentMeta, ComponentStory} from '@storybook/react';
import LoginPage from './LoginPage';

export default {
	title: 'pages/LoginPage',
	component: LoginPage,
	argTypes: {
		backgroundColor: {control: 'color'},
	},
} as ComponentMeta<typeof LoginPage>;

const Template: ComponentStory<typeof LoginPage> = (args) => <LoginPage />;

export const LoginPageStory = Template.bind({});
LoginPageStory.args = {};
