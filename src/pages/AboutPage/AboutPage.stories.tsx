import {ComponentMeta, ComponentStory} from '@storybook/react';
import AboutPage from './AboutPage';

export default {
	title: 'pages/AboutPage',
	component: AboutPage,
	argTypes: {
		backgroundColor: {control: 'color'},
	},
} as ComponentMeta<typeof AboutPage>;

const Template: ComponentStory<typeof AboutPage> = (args) => <AboutPage {...args} />;

export const AboutPageStory = Template.bind({});
AboutPageStory.args = {
	version: 'v1.0.0',
};
