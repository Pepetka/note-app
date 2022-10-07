import {ComponentMeta, ComponentStory} from '@storybook/react';
import {ModalConfirm} from './ModalConfirm';

export default {
	title: 'components/ModalConfirm',
	component: ModalConfirm,
	argTypes: {
		backgroundColor: {control: 'color'},
	},
} as ComponentMeta<typeof ModalConfirm>;

const Template: ComponentStory<typeof ModalConfirm> = (args) => <ModalConfirm {...args} />;

export const ModalConfirmStory = Template.bind({});
ModalConfirmStory.args = {
	isOpen: true,
	onClose: () => { },
	onConfirm: () => { },
};
