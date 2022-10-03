import {ComponentMeta, ComponentStory} from '@storybook/react';
import {SideBar} from './SideBar';

export default {
	title: 'components/SideBar',
	component: SideBar,
	argTypes: {
		backgroundColor: {control: 'color'},
	},
} as ComponentMeta<typeof SideBar>;

const Template: ComponentStory<typeof SideBar> = (args) => <SideBar />;

export const SideBarStory = Template.bind({});
SideBarStory.args = {};
