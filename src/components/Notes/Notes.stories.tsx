import {ComponentMeta, ComponentStory} from '@storybook/react';
import {FilterTypes, Note} from 'store/model/notes/types/NotesSchema';
import {Notes} from './Notes';
import {StateSchema} from 'store/model/types/StateSchema';
import {StoreDecorator} from 'helpers/storybook/StoreDecorator/StoreDecorator';

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

const initialStateWithNotes: DeepPartial<StateSchema> = {
	notes: {
		filter: FilterTypes.ALL,
		notes,
	},
	user: {
		user: {
			id: 'id',
			token: 'token',
			email: 'mail@mail.ru',
		},
	},
};
const initialStateWithoutNotes: DeepPartial<StateSchema> = {
	notes: {
		filter: FilterTypes.ALL,
		notes: [],
	},
	user: {
		user: {
			id: 'id',
			token: 'token',
			email: 'mail@mail.ru',
		},
	},
};

export const NotesWithNotes = Template.bind({});
NotesWithNotes.args = {
	handleSort: false,
};
NotesWithNotes.decorators = [
	StoreDecorator(initialStateWithNotes as StateSchema),
];

export const NotesWithoutNotes = Template.bind({});
NotesWithoutNotes.args = {
	handleSort: false,
};
NotesWithoutNotes.decorators = [
	StoreDecorator(initialStateWithoutNotes as StateSchema),
];
