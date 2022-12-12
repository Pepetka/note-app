import {ComponentMeta, ComponentStory} from '@storybook/react';
import {NotesItem} from './NotesItem';
import {DragDecorator} from 'shared/helpers/storybook/DragDecorator/DragDecorator';
import {FilterTypes, Note} from 'store/model/notes/types/NotesSchema';
import {StateSchema} from 'store/model/types/StateSchema';
import {StoreDecorator} from 'shared/helpers/storybook/StoreDecorator/StoreDecorator';

export default {
	title: 'components/NotesItem',
	component: NotesItem,
	argTypes: {
		backgroundColor: {control: 'color'},
	},
} as ComponentMeta<typeof NotesItem>;

const Template: ComponentStory<typeof NotesItem> = (args) => <NotesItem {...args} />;

const noteItem: Note = {
	id: '10101',
	title: 'Note title',
	date: '30.03.2000, 21:00:00',
	isImportant: false,
	isDisable: false,
	order: 0,
};

const initialState: DeepPartial<StateSchema> = {
	notes: {
		filter: FilterTypes.ALL,
	},
	user: {
		user: {
			id: 'id',
			token: 'token',
			email: 'mail@mail.ru',
		},
	},
};

export const NotesItemDefault = Template.bind({});
NotesItemDefault.args = {
	note: noteItem,
	handleSort: false,
	index: 0,
};
NotesItemDefault.decorators = [
	DragDecorator,
	StoreDecorator(initialState as StateSchema),
];

export const NotesItemImportant = Template.bind({});
NotesItemImportant.args = {
	note: {...noteItem, isImportant: true},
	handleSort: false,
	index: 0,

};
NotesItemImportant.decorators = [
	DragDecorator,
	StoreDecorator(initialState as StateSchema),

];

export const NotesItemDisable = Template.bind({});
NotesItemDisable.args = {
	note: {...noteItem, isDisable: true},
	handleSort: false,
	index: 0,
};
NotesItemDisable.decorators = [
	DragDecorator,
	StoreDecorator(initialState as StateSchema),
];
