import {Provider} from 'react-redux';
import {Story} from '@storybook/react';
import {store} from 'store';

export const StoreDecorator = (StoryComponent: Story) => (
	<Provider store={store}>
		<StoryComponent />
	</Provider>
);
