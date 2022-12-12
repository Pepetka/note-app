import {Story} from '@storybook/react';
import {StoreProvider} from 'store/ui/StoreProvider/StoreProvider';
import {StateSchema} from 'store/model/types/StateSchema';

export const StoreDecorator = (initialState?: StateSchema) => {
	return (StoryComponent: Story) => (
		<StoreProvider initialState={initialState}>
			<StoryComponent />
		</StoreProvider>
	);
};
