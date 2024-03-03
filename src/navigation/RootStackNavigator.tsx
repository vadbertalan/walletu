import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {FC} from 'react';

import {LoginScreen} from 'src/screens/login/LoginScreen';
import {WalletScreen} from 'src/screens/wallet/WalletScreen';
import {StackParamLists} from './stack-param-lists';
import {SendTransactionScreen} from 'src/screens/transaction/SendTransactionScreen';
import {WatchTransactionScreen} from 'src/screens/transaction/WatchTransactionScreen';
import {LogoutButton} from 'src/components/LogoutButton';
import {DappScreen} from 'src/screens/dapp/DappScreen';

const Stack = createNativeStackNavigator<StackParamLists>();

export const RootStackNavigator: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen component={LoginScreen} name="Login" />
      <Stack.Group screenOptions={{headerLeft: LogoutButton}}>
        <Stack.Screen component={WalletScreen} name="Wallet" />
      </Stack.Group>
      <Stack.Screen
        component={SendTransactionScreen}
        name="SendTransaction"
        options={{title: 'Send transaction'}}
      />
      <Stack.Screen
        component={WatchTransactionScreen}
        name="WatchTransaction"
        options={{title: 'Watch transaction'}}
      />
      <Stack.Screen
        component={DappScreen}
        name="Dapp"
        options={{title: 'Dapp'}}
      />
    </Stack.Navigator>
  );
};
