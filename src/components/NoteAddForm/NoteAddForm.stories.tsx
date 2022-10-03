import {ComponentMeta, ComponentStory} from '@storybook/react';
import {NoteAddForm} from './NoteAddForm';

export default {
	title: 'components/NoteAddForm',
	component: NoteAddForm,
	argTypes: {
		backgroundColor: {control: 'color'},
	},
} as ComponentMeta<typeof NoteAddForm>;

const Template: ComponentStory<typeof NoteAddForm> = (args) => <NoteAddForm />;

export const NoteAddFormStory = Template.bind({});
NoteAddFormStory.args = {};
