import React from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  View,
} from 'react-native';

import {StackParamList} from 'src/navigation/StackParamList';
import {useWallet} from './use-wallet';
import {OwnTransactionListItem} from './transaction/TransactionListItem';

export const WalletScreen: React.FC = () => {
  const {
    params: {address},
  } = useRoute<RouteProp<StackParamList, 'Wallet'>>();

  const {
    account,
    isLoading,
    accountRequestError,
    transactions,
    transactionsRequestError,
  } = useWallet(address);

  return (
    <ScrollView contentContainerStyle={styles.container} bounces={false}>
      <Text style={styles.title}>Wallet</Text>
      <Text style={styles.subtitle}>Address</Text>
      <Text style={styles.dataText}>{address}</Text>

      {accountRequestError ? (
        <Text style={styles.errorText}>{accountRequestError}</Text>
      ) : (
        <>
          <Text style={styles.subtitle}>Balance</Text>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            // TODO: Format eGLD amount into XeGLD (1 xEGLD = 10^18 eGLD)
            <Text style={styles.dataText}>{account?.balance} eGLD</Text>
          )}
        </>
      )}

      {transactionsRequestError ? (
        <Text style={styles.errorText}>{transactionsRequestError}</Text>
      ) : (
        <>
          <Text style={styles.subtitle}>Transactions</Text>
          <View style={styles.transactionsListContainer}>
            {isLoading ? (
              <ActivityIndicator />
            ) : transactions.length > 0 ? (
              transactions.map(tx => (
                <OwnTransactionListItem
                  key={tx.txHash}
                  address={address}
                  transaction={tx}
                />
              ))
            ) : (
              <Text style={styles.dataText}>No Transactions</Text>
            )}
          </View>
        </>
      )}
    </ScrollView>
  );
};

// TODO-UI: use theming library and unify colors and metrics
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    padding: 10,
  },
  errorText: {color: 'red'},
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
  transactionsListContainer: {
    width: '100%',
    flex: 1,
    gap: 10,
    marginBottom: 20,
  },
});
