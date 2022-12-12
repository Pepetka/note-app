import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Alert} from './Alert';
import {StoreDecorator} from 'shared/helpers/storybook/StoreDecorator/StoreDecorator';
import {StateSchema} from 'store/model/types/StateSchema';

export default {
	title: 'components/Alert',
	component: Alert,
	argTypes: {
		backgroundColor: {control: 'color'},
	},
} as ComponentMeta<typeof Alert>;

const Template: ComponentStory<typeof Alert> = (args) => <Alert />;

const initialStateDanger: DeepPartial<StateSchema> = {
	alert: {
		text: 'Alert message',
		visible: true,
		type: 'danger',
	},
};
const initialStateSuccess: DeepPartial<StateSchema> = {
	alert: {
		text: 'Alert message',
		visible: true,
		type: 'success',
	},
};
const initialStateWarning: DeepPartial<StateSchema> = {
	alert: {
		text: 'Alert message',
		visible: true,
		type: 'warning',
	},
};

export const AlertDanger = Template.bind({});
AlertDanger.args = {};
AlertDanger.decorators = [
	StoreDecorator(initialStateDanger as StateSchema),
];

export const AlertSuccess= Template.bind({});
AlertSuccess.args = {};
AlertSuccess.decorators = [
	StoreDecorator(initialStateSuccess as StateSchema),
];

export const AlertWarning = Template.bind({});
AlertWarning.args = {};
AlertWarning.decorators = [
	StoreDecorator(initialStateWarning as StateSchema),
];
