import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {FC} from 'react';
import {LoginScreen} from 'src/screens/login/LoginScreen';
import {WalletScreen} from 'src/screens/wallet/WalletScreen';
import {StackParamList} from './StackParamList';
import {LogoutButton} from 'src/components/LogoutButton';

const Stack = createNativeStackNavigator<StackParamList>();

export const RootStackNavigator: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen component={LoginScreen} name="Login" />
      <Stack.Group screenOptions={{headerLeft: LogoutButton}}>
        <Stack.Screen component={WalletScreen} name="Wallet" />
      </Stack.Group>
    </Stack.Navigator>
  );
};
