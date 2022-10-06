module.exports = {
  stories: [
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-create-react-app"
  ],
  framework: "@storybook/react",
  staticDirs: ['../public'],
  core: {
    builder: "@storybook/builder-webpack5"
  },
  features: {
    storyStoreV7: !global.navigator?.userAgent?.match?.('jsdom'),
  },
}