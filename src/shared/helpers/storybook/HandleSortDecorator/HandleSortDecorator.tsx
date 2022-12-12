import {Story} from '@storybook/react';
import {HandleSortProvider} from 'context/handleSort/HandleSortProvider';

export const HandleSortDecorator = (StoryComponent: Story) => (
	<HandleSortProvider>
		<StoryComponent />
	</HandleSortProvider>
);
