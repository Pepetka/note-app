import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Drawer} from './Drawer';

export default {
	title: 'lib/Drawer',
	component: Drawer,
	argTypes: {
		backgroundColor: {control: 'color'},
	},
} as ComponentMeta<typeof Drawer>;

const Template: ComponentStory<typeof Drawer> = (args) => <Drawer {...args} />;

export const DrawerStory = Template.bind({});
DrawerStory.args = {
	children: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
  Mollitia excepturi quidem temporibus quo cumque? Quibusdam, alias cumque.
  Quia reiciendis ducimus ut beatae numquam, at porro eaque ex ad, nisi eos.`,
	isOpen: true,
};
