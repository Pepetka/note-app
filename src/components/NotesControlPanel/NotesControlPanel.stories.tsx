import {ComponentMeta, ComponentStory} from '@storybook/react';
import {NotesControlPanel} from './NotesControlPanel';

export default {
	title: 'components/NotesControlPanel',
	component: NotesControlPanel,
	argTypes: {
		backgroundColor: {control: 'color'},
	},
} as ComponentMeta<typeof NotesControlPanel>;

const Template: ComponentStory<typeof NotesControlPanel> = (args) => <NotesControlPanel {...args} />;

export const NotesControlPanelStory = Template.bind({});
NotesControlPanelStory.args = {
	notesLength: 10,
};
