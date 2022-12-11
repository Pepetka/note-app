import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Filters} from './Filters';
import {StoreDecorator} from 'shared/helpers/storybook/StoreDecorator/StoreDecorator';

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
FiltersStory.decorators = [
	StoreDecorator(),
];
