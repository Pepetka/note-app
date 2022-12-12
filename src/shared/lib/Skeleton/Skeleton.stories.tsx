import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Skeleton} from './Skeleton';

export default {
	title: 'lib/Skeleton',
	component: Skeleton,
	argTypes: {
		backgroundColor: {control: 'color'},
	},
} as ComponentMeta<typeof Skeleton>;

const Template: ComponentStory<typeof Skeleton> = (args) => <Skeleton {...args} />;

export const SkeletonStory = Template.bind({});
SkeletonStory.args = {
	width: '100%',
	height: 50,
};

export const SkeletonSquare = Template.bind({});
SkeletonSquare.args = {
	width: 50,
};

export const SkeletonCircle = Template.bind({});
SkeletonCircle.args = {
	width: 50,
	circle: true,
};
