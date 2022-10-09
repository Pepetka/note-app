import {ComponentMeta, ComponentStory} from '@storybook/react';
import {ErrorReloadTemplate} from './ErrorReloadTemplate';
import {StoreDecorator} from 'helpers/storybook/StoreDecorator/StoreDecorator';

export default {
	title: 'components/ErrorReloadTemplate',
	component: ErrorReloadTemplate,
	argTypes: {
		backgroundColor: {control: 'color'},
	},
} as ComponentMeta<typeof ErrorReloadTemplate>;

const Template: ComponentStory<typeof ErrorReloadTemplate> = (args) => <ErrorReloadTemplate />;

export const ErrorReloadTemplateStory = Template.bind({});
ErrorReloadTemplateStory.args = {};
ErrorReloadTemplateStory.decorators = [
	StoreDecorator(),
];
