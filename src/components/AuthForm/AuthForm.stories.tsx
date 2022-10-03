import {ComponentMeta, ComponentStory} from '@storybook/react';
import {AuthForm} from './AuthForm';

export default {
	title: 'components/AuthForm',
	component: AuthForm,
	argTypes: {
		backgroundColor: {control: 'color'},
	},
} as ComponentMeta<typeof AuthForm>;

const Template: ComponentStory<typeof AuthForm> = (args) => <AuthForm {...args} />;

export const AuthFormStory = Template.bind({});
AuthFormStory.args = {
	title: 'Title',
};
