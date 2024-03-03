import React, {FC, useCallback} from 'react';
import {Text, Alert, TouchableOpacity, StyleSheet} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamLists} from 'src/navigation/stack-param-lists';

export const LogoutButton: FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<StackParamLists>>();

  const handlePress = useCallback(() => {
    Alert.alert('Confirmation', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        onPress: () => {
          navigation.reset({
            index: 0,
            routes: [{name: 'Login'}],
          });
        },
      },
    ]);
  }, [navigation]);

  return (
    <TouchableOpacity style={styles.pressable} onPress={handlePress}>
      {/* TODO-UI: use proper icon with hacky width height */}
      <Text>⬅️</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pressable: {height: 20, width: 20},
});
