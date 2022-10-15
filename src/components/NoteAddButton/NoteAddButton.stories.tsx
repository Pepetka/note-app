import {ComponentMeta, ComponentStory} from '@storybook/react';
import {NoteAddButton} from './NoteAddButton';

export default {
	title: 'components/NoteAddButton',
	component: NoteAddButton,
	argTypes: {
		backgroundColor: {control: 'color'},
	},
} as ComponentMeta<typeof NoteAddButton>;

const Template: ComponentStory<typeof NoteAddButton> = (args) => <NoteAddButton {...args} />;

export const NoteAddButtonStory = Template.bind({});
NoteAddButtonStory.args = {
	onClick: () => {},
};

