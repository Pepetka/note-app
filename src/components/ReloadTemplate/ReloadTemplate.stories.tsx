import {ComponentMeta, ComponentStory} from '@storybook/react';
import {ReloadTemplate} from './ReloadTemplate';

export default {
	title: 'components/ReloadTemplate',
	component: ReloadTemplate,
	argTypes: {
		backgroundColor: {control: 'color'},
	},
} as ComponentMeta<typeof ReloadTemplate>;

const Template: ComponentStory<typeof ReloadTemplate> = (args) => <ReloadTemplate {...args} />;

export const ReloadTemplateStory = Template.bind({});
ReloadTemplateStory.args = {
	onReload: () => {},
	storybookError: 'Error message',
};
