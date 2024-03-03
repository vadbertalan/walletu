import {TokenTransfer} from '@multiversx/sdk-core';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {StackParamLists} from 'src/navigation/stack-param-lists';
import {TransactionService} from 'src/services/transaction-service';

export const SendTransactionScreen: React.FC = () => {
  //   const {navigate} =
  useNavigation<
    NativeStackNavigationProp<StackParamLists, 'SendTransaction'>
  >();
  const {
    params: {account},
  } = useRoute<RouteProp<StackParamLists, 'SendTransaction'>>();

  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [isSending, setSending] = useState(false);

  const handleSendTransaction = useCallback(async () => {
    setSending(true);

    try {
      const tx = await TransactionService.prepareTx(
        account.address,
        toAddress,
        amount,
      );

      const txHash = await TransactionService.sendTx(tx);

      Alert.alert('Transaction sent', 'Transaction hash: ' + txHash);
      // TODO: navigate to WatchTransaction screen
    } catch (error) {
      console.debug('Error sending transaction:', error);
      Alert.alert('Error', 'Error sending transaction: ' + error);
    } finally {
      setSending(false);
    }
  }, [account.address, amount, toAddress]);

  const isToAddressValid = toAddress.length > 0;

  const isAmountValid =
    !isNaN(Number(amount)) &&
    Number(amount) > 0 &&
    BigInt(TokenTransfer.egldFromAmount(amount).toString()) <=
      BigInt(account.balance);

  const isFormValid = isToAddressValid && isAmountValid;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Send</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.subtitle}>To</Text>
        <TextInput
          style={styles.input}
          placeholder="erd1xch5..."
          value={toAddress}
          onChangeText={setToAddress}
        />
        {!isToAddressValid && <Text style={styles.error}>Invalid address</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.subtitle}>
          {/* TODO: format xEGLD */}
          Amount xEGLD (max {account.balance})
        </Text>
        <TextInput
          style={styles.input}
          placeholder="5"
          value={amount}
          onChangeText={setAmount}
        />
        {!isAmountValid && <Text style={styles.error}>Invalid amount</Text>}
      </View>

      <View style={styles.button}>
        {isSending ? (
          <ActivityIndicator />
        ) : (
          <Button
            title="Send transaction"
            onPress={handleSendTransaction}
            disabled={!isFormValid}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 20,
    marginBottom: 5,
    color: 'grey',
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 5,
    paddingHorizontal: 8,
  },
  button: {
    marginTop: 20,
  },
  error: {
    color: 'red',
    fontSize: 12,
  },
});
