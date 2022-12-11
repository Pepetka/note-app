import {ComponentMeta, ComponentStory} from '@storybook/react';
import {DrawerNoteAdd} from './DrawerNoteAdd';

export default {
	title: 'components/DrawerNoteAdd',
	component: DrawerNoteAdd,
	argTypes: {
		backgroundColor: {control: 'color'},
	},
} as ComponentMeta<typeof DrawerNoteAdd>;

const Template: ComponentStory<typeof DrawerNoteAdd> = (args) => <DrawerNoteAdd {...args} />;

export const DrawerNoteAddStory = Template.bind({});
DrawerNoteAddStory.args = {
	isOpen: true,
};
