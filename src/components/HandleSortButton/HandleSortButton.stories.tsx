import {ComponentMeta, ComponentStory} from '@storybook/react';
import {HandleSortButton} from './HandleSortButton';

export default {
	title: 'components/HandleSortButton',
	component: HandleSortButton,
	argTypes: {
		backgroundColor: {control: 'color'},
	},
} as ComponentMeta<typeof HandleSortButton>;

const Template: ComponentStory<typeof HandleSortButton> = (args) => <HandleSortButton />;

export const HandleSortButtonStory = Template.bind({});
HandleSortButtonStory.args = {};
