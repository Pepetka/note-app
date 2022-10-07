import {ComponentMeta, ComponentStory} from '@storybook/react';
import {About} from './About';

export default {
	title: 'components/About',
	component: About,
	argTypes: {
		backgroundColor: {control: 'color'},
	},
} as ComponentMeta<typeof About>;

const Template: ComponentStory<typeof About> = (args) => <About {...args} />;

export const AboutStory = Template.bind({});
AboutStory.args = {
	version: 'v1.0.0',
};
