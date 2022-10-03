import {ComponentMeta, ComponentStory} from '@storybook/react';
import {NavBar} from './NavBar';

export default {
	title: 'components/NavBar',
	component: NavBar,
	argTypes: {
		backgroundColor: {control: 'color'},
	},
} as ComponentMeta<typeof NavBar>;

const Template: ComponentStory<typeof NavBar> = (args) => <NavBar />;

export const NavBarStory = Template.bind({});
NavBarStory.args = {};
