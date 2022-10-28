import {ComponentMeta, ComponentStory} from '@storybook/react';
import {StoreDecorator} from 'helpers/storybook/StoreDecorator/StoreDecorator';
import {HomePage} from './HomePage';
import {StateSchema} from 'store/model/types/StateSchema';
import {FilterTypes} from 'store/model/notes/types/NotesSchema';

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
	notes: {
		notes: [],
		error: {},
		filter: FilterTypes.ACTIVE,
		loading: false,
	},
};

export const HomePageStory = Template.bind({});
HomePageStory.args = {};
HomePageStory.decorators = [
	StoreDecorator(initialState as StateSchema),
];
