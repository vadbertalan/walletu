/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {DappProvider} from '@multiversx/sdk-dapp/wrappers';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {RootStackNavigator} from './navigation/RootStackNavigator';
import {ENV} from './constants';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaProvider>
      <DappProvider environment={ENV}>
        <NavigationContainer>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <RootStackNavigator />
        </NavigationContainer>
      </DappProvider>
    </SafeAreaProvider>
  );
}

export default App;
