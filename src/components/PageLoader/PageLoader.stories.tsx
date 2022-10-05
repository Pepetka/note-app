import {ComponentMeta, ComponentStory} from '@storybook/react';
import {PageLoader} from './PageLoader';

export default {
	title: 'components/PageLoader',
	component: PageLoader,
	argTypes: {
		backgroundColor: {control: 'color'},
	},
} as ComponentMeta<typeof PageLoader>;

const Template: ComponentStory<typeof PageLoader> = (args) => <PageLoader />;

export const PageLoaderStory = Template.bind({});
PageLoaderStory.args = {};
