import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Modal} from './Modal';

export default {
	title: 'lib/Modal',
	component: Modal,
	argTypes: {
		backgroundColor: {control: 'color'},
	},
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const ModalStory = Template.bind({});
ModalStory.args = {
	children: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
  Mollitia excepturi quidem temporibus quo cumque? Quibusdam, alias cumque.
  Quia reiciendis ducimus ut beatae numquam, at porro eaque ex ad, nisi eos.`,
	isOpen: true,
};
