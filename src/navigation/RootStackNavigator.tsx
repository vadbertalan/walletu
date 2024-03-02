import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {FC} from 'react';
import {LoginScreen} from 'src/screens/LoginScreen';

const Stack = createNativeStackNavigator();

export const RootStackNavigator: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen component={LoginScreen} name="Login" />
    </Stack.Navigator>
  );
};
