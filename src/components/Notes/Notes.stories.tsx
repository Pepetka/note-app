import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Notes} from './Notes';
import {Note} from '../../types';

export default {
	title: 'components/Notes',
	component: Notes,
	argTypes: {
		backgroundColor: {control: 'color'},
	},
} as ComponentMeta<typeof Notes>;

const Template: ComponentStory<typeof Notes> = (args) => <Notes {...args} />;

const notes: Array<Note> = [
	{
		id: '10101',
		title: 'Note title 1',
		date: '30.03.2000, 21:00:00',
		isImportant: false,
		isDisable: false,
		order: 0,
	},
	{
		id: '10102',
		title: 'Note title 2',
		date: '30.03.2000, 21:00:00',
		isImportant: true,
		isDisable: false,
		order: 1,
	},
	{
		id: '10103',
		title: 'Note title 3',
		date: '30.03.2000, 21:00:00',
		isImportant: false,
		isDisable: true,
		order: 2,
	},
];

export const NotesWithNotes = Template.bind({});
NotesWithNotes.args = {
	storybookNotes: notes,
	handleSort: false,
	storybookFilter: 'all',
};

export const NotesWithoutNotes = Template.bind({});
NotesWithoutNotes.args = {
	storybookNotes: [],
	handleSort: false,
	storybookFilter: 'all',
};
