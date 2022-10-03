import {Story} from '@storybook/react';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';

export const DragDecorator = (StoryComponent: Story) => (
	<DragDropContext onDragEnd={() => {}}>
		<Droppable droppableId='droppable'>
			{(provided) => (
				<div {...provided.droppableProps} ref={provided.innerRef}>
					<StoryComponent />
					{provided.placeholder}
				</div>
			)}
		</Droppable>
	</DragDropContext>
);
