import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Flex} from './Flex';

export default {
	title: 'lib/Flex',
	component: Flex,
	argTypes: {
		backgroundColor: {control: 'color'},
	},
} as ComponentMeta<typeof Flex>;

const Template: ComponentStory<typeof Flex> = (args) => <Flex {...args} />;

export const FlexRow = Template.bind({});
FlexRow.args = {
	children: (
		<>
			<span>Flex</span>
			<span>Flex</span>
			<span>Flex</span>
			<span>Flex</span>
			<span>Flex</span>
		</>
	),
};

export const FlexRowBetween = Template.bind({});
FlexRowBetween.args = {
	children: (
		<>
			<span>Flex</span>
			<span>Flex</span>
			<span>Flex</span>
			<span>Flex</span>
			<span>Flex</span>
		</>
	),
	justify: 'between',
};

export const FlexRowCenter = Template.bind({});
FlexRowCenter.args = {
	children: (
		<>
			<span>Flex</span>
			<span>Flex</span>
			<span>Flex</span>
			<span>Flex</span>
			<span>Flex</span>
		</>
	),
	justify: 'center',
};

export const FlexRow8 = Template.bind({});
FlexRow8.args = {
	children: (
		<>
			<span>Flex</span>
			<span>Flex</span>
			<span>Flex</span>
			<span>Flex</span>
			<span>Flex</span>
		</>
	),
	gap: '8',
};

export const FlexRow16 = Template.bind({});
FlexRow16.args = {
	children: (
		<>
			<span>Flex</span>
			<span>Flex</span>
			<span>Flex</span>
			<span>Flex</span>
			<span>Flex</span>
		</>
	),
	gap: '16',
};

export const FlexRow24 = Template.bind({});
FlexRow24.args = {
	children: (
		<>
			<span>Flex</span>
			<span>Flex</span>
			<span>Flex</span>
			<span>Flex</span>
			<span>Flex</span>
		</>
	),
	gap: '24',
};

export const FlexRow32 = Template.bind({});
FlexRow32.args = {
	children: (
		<>
			<span>Flex</span>
			<span>Flex</span>
			<span>Flex</span>
			<span>Flex</span>
			<span>Flex</span>
		</>
	),
	gap: '32',
};

export const FlexColumn = Template.bind({});
FlexColumn.args = {
	children: (
		<>
			<span>Flex</span>
			<span>Flex</span>
			<span>Flex</span>
			<span>Flex</span>
			<span>Flex</span>
		</>
	),
	direction: 'column',
};

export const FlexColumnCenter = Template.bind({});
FlexColumnCenter.args = {
	children: (
		<>
			<span>Flex</span>
			<span>Flex</span>
			<span>Flex</span>
			<span>Flex</span>
			<span>Flex</span>
		</>
	),
	direction: 'column',
	align: 'center',
};

export const FlexColumn8 = Template.bind({});
FlexColumn8.args = {
	children: (
		<>
			<span>Flex</span>
			<span>Flex</span>
			<span>Flex</span>
			<span>Flex</span>
			<span>Flex</span>
		</>
	),
	direction: 'column',
	gap: '8',
};

export const FlexColumn16 = Template.bind({});
FlexColumn16.args = {
	children: (
		<>
			<span>Flex</span>
			<span>Flex</span>
			<span>Flex</span>
			<span>Flex</span>
			<span>Flex</span>
		</>
	),
	direction: 'column',
	gap: '16',
};

export const FlexColumn24 = Template.bind({});
FlexColumn24.args = {
	children: (
		<>
			<span>Flex</span>
			<span>Flex</span>
			<span>Flex</span>
			<span>Flex</span>
			<span>Flex</span>
		</>
	),
	direction: 'column',
	gap: '24',
};

export const FlexColumn32 = Template.bind({});
FlexColumn32.args = {
	children: (
		<>
			<span>Flex</span>
			<span>Flex</span>
			<span>Flex</span>
			<span>Flex</span>
			<span>Flex</span>
		</>
	),
	direction: 'column',
	gap: '32',
};
