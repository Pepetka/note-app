import {Story} from '@storybook/react';
import {StoreProvider} from 'store/StoreProvider/StoreProvider';
import {StateSchema} from 'store/types/StateSchema';

export const StoreDecorator = (initialState?: StateSchema) => {
	return (StoryComponent: Story) => (
		<StoreProvider initialState={initialState}>
			<StoryComponent />
		</StoreProvider>
	);
};
