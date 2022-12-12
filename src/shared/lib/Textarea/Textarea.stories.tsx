import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Textarea} from './Textarea';

export default {
	title: 'lib/Textarea',
	component: Textarea,
	argTypes: {
		backgroundColor: {control: 'color'},
	},
} as ComponentMeta<typeof Textarea>;

const Template: ComponentStory<typeof Textarea> = (args) => <Textarea {...args} />;

export const TextareaStory = Template.bind({});
TextareaStory.args = {
	placeholder: 'Some placeholder',
};

export const TextareaWithFloatPlaceholder = Template.bind({});
TextareaWithFloatPlaceholder.args = {
	floatPlaceholder: 'Some float placeholder',
	value: 'Some value',
};

