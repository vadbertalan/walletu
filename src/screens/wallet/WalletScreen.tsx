import React, {useCallback} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  View,
  Button,
  RefreshControl,
} from 'react-native';

import {StackParamLists} from 'src/navigation/stack-param-lists';
import {useWallet} from './use-wallet';
import {OwnTransactionListItem} from './OwnTransactionListItem';
import {NativeStackNavigationProp} from '@react-navigation/native-stack/lib/typescript/src/types';

export const WalletScreen: React.FC = () => {
  const {navigate} =
    useNavigation<NativeStackNavigationProp<StackParamLists, 'Wallet'>>();
  const {
    params: {address},
  } = useRoute<RouteProp<StackParamLists, 'Wallet'>>();

  const {
    account,
    isLoading,
    isRefreshing,
    refreshAccount,
    accountRequestError,
    transactions,
    transactionsRequestError,
  } = useWallet(address);

  const onSendTransactionPressed = useCallback(() => {
    if (account) {
      navigate('SendTransaction', {account});
    }
  }, [account, navigate]);

  const onOpenDappPressed = useCallback(() => {
    if (account) {
      navigate('Dapp', {account});
    }
  }, [account, navigate]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <RefreshControl refreshing={isRefreshing} onRefresh={refreshAccount} />

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

          <Text style={styles.subtitle}>Nonce</Text>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            // TODO: Format eGLD amount into XeGLD (1 xEGLD = 10^18 eGLD)
            <Text style={styles.dataText}>{account?.nonce}</Text>
          )}
        </>
      )}

      <View style={styles.buttonContainer}>
        <Button
          title="Send transaction"
          onPress={onSendTransactionPressed}
          disabled={!account}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Open Dapp"
          onPress={onOpenDappPressed}
          disabled={!account}
        />
      </View>

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
  buttonContainer: {marginVertical: 20},
});
