import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Loader} from './Loader';

export default {
	title: 'components/Loader',
	component: Loader,
	argTypes: {
		backgroundColor: {control: 'color'},
	},
} as ComponentMeta<typeof Loader>;

const Template: ComponentStory<typeof Loader> = (args) => <Loader/>;

export const LoaderStory = Template.bind({});
LoaderStory.args = {};
