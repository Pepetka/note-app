import {ComponentMeta, ComponentStory} from '@storybook/react';
import {RegisterPage} from './RegisterPage';

export default {
	title: 'pages/RegisterPage',
	component: RegisterPage,
	argTypes: {
		backgroundColor: {control: 'color'},
	},
} as ComponentMeta<typeof RegisterPage>;

const Template: ComponentStory<typeof RegisterPage> = (args) => <RegisterPage />;

export const RegisterPageStory = Template.bind({});
RegisterPageStory.args = {};
