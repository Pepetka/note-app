import {ComponentMeta, ComponentStory} from '@storybook/react';
import {HomePagetemplate} from './HomePageTemplate';

export default {
	title: 'pages/HomePage',
	component: HomePagetemplate,
	argTypes: {
		backgroundColor: {control: 'color'},
	},
} as ComponentMeta<typeof HomePagetemplate>;

const Template: ComponentStory<typeof HomePagetemplate> = (args) => <HomePagetemplate />;

export const HomePageStory = Template.bind({});
HomePageStory.args = {};
