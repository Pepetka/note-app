import {ComponentMeta, ComponentStory} from '@storybook/react';
import {NotesItem} from './NotesItem';
import {Note} from 'types';
import {DragDecorator} from 'helpers/storybook/DragDecorator/DragDecorator';

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

export const NotesItemDefault = Template.bind({});
NotesItemDefault.args = {
	note: noteItem,
	handleSort: false,
	index: 0,
};
NotesItemDefault.decorators = [
	DragDecorator,
];

export const NotesItemImportant = Template.bind({});
NotesItemImportant.args = {
	note: {...noteItem, isImportant: true},
	handleSort: false,
	index: 0,

};
NotesItemImportant.decorators = [
	DragDecorator,
];

export const NotesItemDisable = Template.bind({});
NotesItemDisable.args = {
	note: {...noteItem, isDisable: true},
	handleSort: false,
	index: 0,
	storybookFilter: 'all',

};
NotesItemDisable.decorators = [
	DragDecorator,
];
