import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Transaction} from 'src/types/transaction';

interface OwnTransactionListItemTransactionListItemProps {
  address: string;
  transaction: Transaction;
}

const TX_HASH_FIRST_N_CHAR = 10;

export const OwnTransactionListItem: React.FC<
  OwnTransactionListItemTransactionListItemProps
> = ({address, transaction}) => {
  const formattedDate = new Date(transaction.timestamp * 1000).toLocaleString();

  return (
    <View style={styles.container}>
      <Text>
        Transaction ID: {transaction.txHash.slice(0, TX_HASH_FIRST_N_CHAR)}...
      </Text>

      {/* TODO: Format eGLD amount into XeGLD */}
      <Text>Amount: {transaction.value} eGLD</Text>

      <Text>Nonce: {transaction.nonce}</Text>

      <Text>Date: {formattedDate}</Text>

      <View style={styles.otherAddressContainer}>
        {address === transaction.sender ? (
          <>
            <Text>To: </Text>
            <Text style={styles.otherAddressText}>{transaction.receiver}</Text>
          </>
        ) : (
          <>
            <Text>From:</Text>
            <Text style={styles.otherAddressText}>{transaction.sender}</Text>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    gap: 10,
    paddingHorizontal: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    width: '100%',
  },
  otherAddressContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  otherAddressText: {
    flexShrink: 1,
    flexWrap: 'wrap',
  },
});
