import {ComponentMeta, ComponentStory} from '@storybook/react';
import {NoteAddFormWithContent} from './NoteAddFormWithContent';

export default {
	title: 'components/NoteAddFormWithContent',
	component: NoteAddFormWithContent,
	argTypes: {
		backgroundColor: {control: 'color'},
	},
} as ComponentMeta<typeof NoteAddFormWithContent>;

const Template: ComponentStory<typeof NoteAddFormWithContent> = (args) => <NoteAddFormWithContent {...args} />;

export const NoteAddFormWithContentStory = Template.bind({});
NoteAddFormWithContentStory.args = {};

