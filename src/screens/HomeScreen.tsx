import React, {FC} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

export const HomeScreen: FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello there, WalletU!</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {alignItems: 'center', flex: 1, justifyContent: 'center'},
});
