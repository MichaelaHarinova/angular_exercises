module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    '../src/app/**/*.stories.ts',
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  "core": {
    "builder": "webpack5"
  }
}
