import {ComponentMeta, ComponentStory} from '@storybook/react';
import {NoteSkeleton} from './NoteSkeleton';

export default {
	title: 'components/NoteSkeleton',
	component: NoteSkeleton,
	argTypes: {
		backgroundColor: {control: 'color'},
	},
} as ComponentMeta<typeof NoteSkeleton>;

const Template: ComponentStory<typeof NoteSkeleton> = (args) => <NoteSkeleton {...args} />;

export const NoteSkeletonStory = Template.bind({});
NoteSkeletonStory.args = {};
