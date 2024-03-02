/**
 * @format
 */

// https://stackoverflow.com/a/49591831
global.Buffer = require('buffer').Buffer;

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
