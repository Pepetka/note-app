import {ComponentMeta, ComponentStory} from '@storybook/react';
import {ModalNoteAdd} from './ModalNoteAdd';

export default {
	title: 'components/ModalNoteAdd',
	component: ModalNoteAdd,
	argTypes: {
		backgroundColor: {control: 'color'},
	},
} as ComponentMeta<typeof ModalNoteAdd>;

const Template: ComponentStory<typeof ModalNoteAdd> = (args) => <ModalNoteAdd {...args} />;

export const ModalNoteAddStory = Template.bind({});
ModalNoteAddStory.args = {
	isOpen: true,
	onClose: () => {},
};

