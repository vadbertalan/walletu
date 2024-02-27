import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {FC} from 'react';
import {HomeScreen} from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

export const RootStackNavigator: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen component={HomeScreen} name="Home" />
    </Stack.Navigator>
  );
};
