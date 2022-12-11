import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Popover} from './Popover';

export default {
	title: 'lib/Popover',
	component: Popover,
	argTypes: {
		backgroundColor: {control: 'color'},
	},
	decorators: [
		(StoryComponent) => (
			<div style={{width: '500px', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
				<StoryComponent/>
			</div>
		),
	],
} as ComponentMeta<typeof Popover>;

const Template: ComponentStory<typeof Popover> = (args) => <Popover {...args} />;

export const PopoverBottomEnd = Template.bind({});
PopoverBottomEnd.args = {
	children: 'Lorem',
	popoverContent: 'popover content',
	position: 'bottom-end',
};

export const PopoverBottomStart = Template.bind({});
PopoverBottomStart.args = {
	children: 'Lorem',
	popoverContent: 'popover content',
	position: 'bottom-start',
};

export const PopoverTopEnd = Template.bind({});
PopoverTopEnd.args = {
	children: 'Lorem',
	popoverContent: 'popover content',
	position: 'top-end',
};

export const PopoverTopStart = Template.bind({});
PopoverTopStart.args = {
	children: 'Lorem',
	popoverContent: 'popover content',
	position: 'top-start',
};

export const PopoverTop = Template.bind({});
PopoverTop.args = {
	children: 'Lorem',
	popoverContent: 'popover content',
	position: 'top',
};

export const PopoverBottom = Template.bind({});
PopoverBottom.args = {
	children: 'Lorem',
	popoverContent: 'popover content',
	position: 'bottom',
};
