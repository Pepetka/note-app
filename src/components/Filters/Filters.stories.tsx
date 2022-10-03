import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Filters} from './Filters';

export default {
	title: 'components/Filters',
	component: Filters,
	argTypes: {
		backgroundColor: {control: 'color'},
	},
} as ComponentMeta<typeof Filters>;

const Template: ComponentStory<typeof Filters> = (args) => <Filters />;

export const FiltersStory = Template.bind({});
FiltersStory.args = {};
