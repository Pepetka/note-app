import {ComponentMeta, ComponentStory} from '@storybook/react';
import {DeleteNoteConfirm} from './DeleteNoteConfirm';

export default {
	title: 'components/DeleteNoteConfirm',
	component: DeleteNoteConfirm,
	argTypes: {
		backgroundColor: {control: 'color'},
	},
} as ComponentMeta<typeof DeleteNoteConfirm>;

const Template: ComponentStory<typeof DeleteNoteConfirm> = (args) => <DeleteNoteConfirm {...args} />;

export const DeleteNoteConfirmStory = Template.bind({});
DeleteNoteConfirmStory.args = {
	onClose: () => {},
	onConfirm: () => {},
};

