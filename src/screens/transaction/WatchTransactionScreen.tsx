import {TransactionHash, TransactionWatcher} from '@multiversx/sdk-core';
import {ApiNetworkProvider} from '@multiversx/sdk-network-providers/out';
import {useRoute, RouteProp} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Linking,
} from 'react-native';

import {BASE_URL, EXPLORER_BASE_URL} from 'src/constants';
import {StackParamLists} from 'src/navigation/stack-param-lists';

export const WatchTransactionScreen: React.FC = () => {
  const {
    params: {transaction},
  } = useRoute<RouteProp<StackParamLists, 'WatchTransaction'>>();

  const [isTxPending, setTxPending] = useState<boolean>(true);

  const onViewOnExplorerPressed = useCallback(async () => {
    try {
      const link = `${EXPLORER_BASE_URL}/transactions/${transaction.hash}`;
      console.debug('Opening URL:', link);
      await Linking.openURL(link);
    } catch (error) {
      console.debug('Error opening URL:', error);
      Alert.alert('Error', 'Error opening URL: ' + error);
    }
  }, [transaction.hash]);

  // Watch transaction on network and update UI when done
  useEffect(() => {
    (async () => {
      try {
        const apiNetworkProvider = new ApiNetworkProvider(BASE_URL);
        const watcher = new TransactionWatcher(apiNetworkProvider);
        const transactionOnNetwork = await watcher.awaitPending({
          getHash: () => new TransactionHash(transaction.hash),
        });
        console.debug('Transaction on network done:', transactionOnNetwork);
        setTxPending(false);
      } catch (error) {
        console.debug('Error which waiting for transaction:', error);
        Alert.alert('Error', 'Error in transaction: ' + error);
      }
    })();
  }, [transaction.hash]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Transaction {isTxPending ? 'Pending' : 'Done'}
      </Text>

      {isTxPending ? (
        <ActivityIndicator size="large" />
      ) : (
        <Text style={styles.bigIcon}>✅</Text>
      )}

      <Text style={styles.subtitle}>Amount xEGLD</Text>
      <Text style={(styles.dataText, {fontWeight: 'bold'})}>
        {transaction.value}
      </Text>

      <Text style={styles.subtitle}>Receiver Address</Text>
      <Text style={styles.dataText}>{transaction.receiver}</Text>

      <Text style={styles.subtitle}>Transaction Hash</Text>
      <Text style={styles.dataText}>{transaction.hash.toString()}</Text>

      <View style={styles.viewButtonContainer}>
        <Button title="View on Explorer" onPress={onViewOnExplorerPressed} />
      </View>
    </View>
  );
};

// TODO-UI: use theming library and unify colors and metrics
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
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
  viewButtonContainer: {
    marginTop: 40,
  },
  bigIcon: {
    fontSize: 40,
  },
});
