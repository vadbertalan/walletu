import React from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';

import {StackParamList} from 'src/navigation/StackParamList';
import {useWallet} from './use-wallet';

export const WalletScreen: React.FC = () => {
  const {
    params: {address},
  } = useRoute<RouteProp<StackParamList, 'Wallet'>>();

  const {account, isLoading, requestError: error} = useWallet(address);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wallet</Text>
      <Text style={styles.subtitle}>Address</Text>
      <Text style={styles.dataText}>{address}</Text>

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <>
          <Text style={styles.subtitle}>Balance</Text>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <Text style={styles.dataText}>{account?.balance} eGLD</Text>
          )}
        </>
      )}
    </View>
  );
};

// TODO-UI: use theming library and unify colors and metrics
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 10,
  },
  errorText: {color: 'red'},
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
    color: 'grey',
  },
  dataText: {
    textAlign: 'center',
  },
});
