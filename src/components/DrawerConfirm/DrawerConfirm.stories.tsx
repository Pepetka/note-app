import {ComponentMeta, ComponentStory} from '@storybook/react';
import {DrawerConfirm} from './DrawerConfirm';

export default {
	title: 'components/DrawerConfirm',
	component: DrawerConfirm,
	argTypes: {
		backgroundColor: {control: 'color'},
	},
} as ComponentMeta<typeof DrawerConfirm>;

const Template: ComponentStory<typeof DrawerConfirm> = (args) => <DrawerConfirm {...args} />;

export const DrawerConfirmStory = Template.bind({});
DrawerConfirmStory.args = {
	onConfirm: () => {},
	isOpen: true,
	onClose: () => {},
};
