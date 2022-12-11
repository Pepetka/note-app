import 'loki/configure-react';
import {StyleDecorator} from "../src/shared/helpers/storybook/StyleDecorator/StyleDecorator";
import {RouterDecorator} from "../src/shared/helpers/storybook/RouterDecorator/RouterDecorator";
import {LocalizationDecorator} from "../src/shared/helpers/storybook/LocalizationDecorator/LocalizationDecorator";
import {HandleSortDecorator} from "../src/shared/helpers/storybook/HandleSortDecorator/HandleSortDecorator";
import {Theme} from "../src/context/theme/ThemeContext";
import {Lang} from "../src/localization/i18n";
import {StoreDecorator} from "../src/shared/helpers/storybook/StoreDecorator/StoreDecorator";

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
    defaultValue: Lang.EN,
    toolbar: {
      icon: 'globe',
      items: [
        { value: Lang.EN, title: 'English' },
        { value: Lang.RU, title: 'Russian' },
      ],
      showName: true,
    },
  },
  globalTheme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: Theme.LIGHT,
    toolbar: {
      items: [
        { value: Theme.DARK, title: 'Dark theme', icon: 'circle' },
        { value: Theme.LIGHT, title: 'Light theme', icon: 'circlehollow' },
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
  HandleSortDecorator,
  StoreDecorator()
];
