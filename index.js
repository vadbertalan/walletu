/**
 * @format
 */

// https://stackoverflow.com/a/49591831
global.Buffer = require('buffer').Buffer;

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

// TextEncoder and TextDecoder are not available. Fix: https://stackoverflow.com/a/74531525
const TextEncodingPolyfill = require('text-encoding');
Object.assign(global, {
  TextEncoder: TextEncodingPolyfill.TextEncoder,
  TextDecoder: TextEncodingPolyfill.TextDecoder,
});

// Needed for sdk-app peer dep, that uses react-dom...
// https://stackoverflow.com/a/61470685
window.addEventListener = function (x) {
  return x;
};
window.removeEventListener = function (x) {
  return x;
};

AppRegistry.registerComponent(appName, () => App);
