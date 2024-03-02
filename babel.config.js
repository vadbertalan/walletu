const path = require('path');

const commonPlugins = [
  [
    require.resolve('babel-plugin-module-resolver'),
    {
      root: [path.resolve('./')],
      alias: {
        src: './src',
      },
    },
  ],
];

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [...commonPlugins],
};
