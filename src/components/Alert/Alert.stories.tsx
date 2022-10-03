import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Alert} from './Alert';

export default {
	title: 'components/Alert',
	component: Alert,
	argTypes: {
		backgroundColor: {control: 'color'},
	},
} as ComponentMeta<typeof Alert>;

const Template: ComponentStory<typeof Alert> = (args) => <Alert {...args} />;

export const AlertDanger = Template.bind({});
AlertDanger.args = {
	storybookVisible: true,
	storybookText: 'Alert message',
	storybookType: 'danger',
};

export const AlertSuccess= Template.bind({});
AlertSuccess.args = {
	storybookVisible: true,
	storybookText: 'Alert message',
	storybookType: 'success',
};

export const AlertWarning = Template.bind({});
AlertWarning.args = {
	storybookVisible: true,
	storybookText: 'Alert message',
	storybookType: 'warning',
};
