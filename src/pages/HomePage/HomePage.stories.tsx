import {ComponentMeta, ComponentStory} from '@storybook/react';
import {StoreDecorator} from 'helpers/storybook/StoreDecorator/StoreDecorator';
import {HomePage} from './HomePage';
import {DeepPartial} from '@reduxjs/toolkit';
import {StateSchema} from 'store/types/StateSchema';

export default {
	title: 'pages/HomePage',
	component: HomePage,
	argTypes: {
		backgroundColor: {control: 'color'},
	},
} as ComponentMeta<typeof HomePage>;

const Template: ComponentStory<typeof HomePage> = (args) => <HomePage />;

const initialState: DeepPartial<StateSchema> = {
	user: {
		user: {
			email: 'email@mail.ru',
			token: 'token',
			id: 'id',
		},
	},
};

export const HomePageStory = Template.bind({});
HomePageStory.args = {};
HomePageStory.decorators = [
	StoreDecorator(initialState as StateSchema),
];
