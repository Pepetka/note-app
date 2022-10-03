import {StyleDecorator} from "../src/helpers/storybook/StyleDecorator/StyleDecorator";
import {RouterDecorator} from "../src/helpers/storybook/RouterDecorator/RouterDecorator";
import {LocalizationDecorator} from "../src/helpers/storybook/LocalizationDecorator/LocalizationDecorator";
import {StoreDecorator} from "../src/helpers/storybook/StoreDecorator/StoreDecorator";
import {HandleSortDecorator} from "../src/helpers/storybook/HandleSortDecorator/HandleSortDecorator";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const globalTypes = {
  globalLocale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: 'en',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', title: 'English' },
        { value: 'ru', title: 'Russian' },
      ],
      showName: true,
    },
  },
  globalTheme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      items: [
        { value: 'dark', title: 'Dark theme', icon: 'circle' },
        { value: 'light', title: 'Light theme', icon: 'circlehollow' },
        { value: 'side-by-side', title: 'Side by Side', icon: 'sidebar' },
      ],
      showName: true,
    },
  },
};

export const decorators = [
  StyleDecorator,
  RouterDecorator,
  LocalizationDecorator,
  StoreDecorator,
  HandleSortDecorator
];
