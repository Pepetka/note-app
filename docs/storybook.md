## Storybook

Стори-кейсы каждого компонента находятся в файлах с расширением `.stories.tsx` рядом с файлами компонентов, которым
эти стори-кейсы принадлежат.

- `npm run storybook` - запуск storybook
- `npm run storybook:build` - сборка storybook

Пример составления стори-кейсов:
```typescript jsx
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Button, ButtonThemes} from './Button';

export default {
	title: 'lib/Button',
	component: Button,
	argTypes: {
		backgroundColor: {control: 'color'},
	},
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	theme: ButtonThemes.PRIMARY,
	children: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
	theme: ButtonThemes.SECONDARY,
	children: 'Button',
};
```

Документация библиотеки - [storybook](https://storybook.js.org/docs/react/get-started/install)
