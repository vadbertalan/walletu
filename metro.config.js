const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  resolver: {
    extraNodeModules: {
      path: require.resolve('path-browserify'),
      crypto: require.resolve('crypto-js'),
      stream: require.resolve('readable-stream'),
      fs: require.resolve('react-native-fs'),
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
