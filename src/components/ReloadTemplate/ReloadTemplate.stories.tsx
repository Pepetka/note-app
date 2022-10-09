import {ComponentMeta, ComponentStory} from '@storybook/react';
import {ReloadTemplate} from './ReloadTemplate';
import {StoreDecorator} from '../../helpers/storybook/StoreDecorator/StoreDecorator';
import {DeepPartial} from '@reduxjs/toolkit';
import {StateSchema} from '../../store/types/StateSchema';

export default {
	title: 'components/ReloadTemplate',
	component: ReloadTemplate,
	argTypes: {
		backgroundColor: {control: 'color'},
	},
} as ComponentMeta<typeof ReloadTemplate>;

const Template: ComponentStory<typeof ReloadTemplate> = (args) => <ReloadTemplate {...args} />;

const initialState: DeepPartial<StateSchema> = {
	notes: {
		error: {
			get: 'Error message',
		},
	},
};

export const ReloadTemplateStory = Template.bind({});
ReloadTemplateStory.args = {
	onReload: () => {},
};
ReloadTemplateStory.decorators = [
	StoreDecorator(initialState as StateSchema),
];
