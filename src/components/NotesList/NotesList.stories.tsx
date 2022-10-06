import {ComponentMeta, ComponentStory} from '@storybook/react';
import {NotesList} from './NotesList';
import {DragDecorator} from 'helpers/storybook/DragDecorator/DragDecorator';
import {Note} from 'types';

export default {
	title: 'components/NotesList',
	component: NotesList,
	argTypes: {
		backgroundColor: {control: 'color'},
	},
} as ComponentMeta<typeof NotesList>;

const Template: ComponentStory<typeof NotesList> = (args) => <NotesList {...args} />;

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

export const NotesListStory = Template.bind({});
NotesListStory.args = {
	notes: notes,
	handleSort: false,
	storybookFilter: 'all',
};
NotesListStory.decorators = [
	DragDecorator,
];
