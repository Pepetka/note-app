import {ComponentMeta, ComponentStory} from '@storybook/react';
import {About} from './About';

export default {
	title: 'components/About',
	component: About,
	argTypes: {
		backgroundColor: {control: 'color'},
	},
} as ComponentMeta<typeof About>;

const Template: ComponentStory<typeof About> = (args) => <About />;

export const AboutStory = Template.bind({});
AboutStory.args = {};
