import {ComponentMeta, ComponentStory} from '@storybook/react';
import {ErrorReloadTemplate} from './ErrorReloadTemplate';

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
