import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {BASE_URL} from 'src/constants';
import {Account} from 'src/types/account';
import {PastTransaction} from 'src/types/transaction';

// TODO: rewrite with RTK Query
// TODO: extract API logic
export const useWallet = (address: string) => {
  const [account, setAccount] = useState<Account | undefined>();
  const [transactions, setTransactions] = useState<PastTransaction[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isRefreshing, setRefreshing] = useState<boolean>(false);
  const [accountRequestError, setAccountRequestError] = useState<
    string | undefined
  >();
  const [transactionsRequestError, setTransactionsRequestError] = useState<
    string | undefined
  >();

  const fetchAccount = useCallback(async () => {
    try {
      setAccountRequestError(undefined);

      const accountResponse = await fetch(`${BASE_URL}/accounts/${address}`);

      if (!accountResponse.ok) {
        throw new Error(
          `Account request failed with status code ${accountResponse.status}`,
        );
      }

      const accountObject = await accountResponse.json();
      setAccount(accountObject);
    } catch (error) {
      console.debug('Error fetching account information:', error);
      setAccountRequestError('Failed to fetch account information');
    }

    try {
      // TODO: request last 10 transactions, not all. use `size` option for this
      const transactionsResponse = await fetch(
        `${BASE_URL}/accounts/${address}/transactions`,
      );

      if (!transactionsResponse.ok) {
        throw new Error(
          `Transactions request failed with status code ${transactionsResponse.status}`,
        );
      }

      const transactionsArray = await transactionsResponse.json();
      setTransactions(transactionsArray);
    } catch (error) {
      console.debug('Error fetching transactions:', error);
      setTransactionsRequestError('Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  }, [
    address,
    setAccount,
    setAccountRequestError,
    setTransactions,
    setTransactionsRequestError,
    setLoading,
  ]);

  const refreshAccount = useCallback(async () => {
    setRefreshing(true);
    await fetchAccount();
    setRefreshing(false);
  }, [fetchAccount]);

  // Fetch account data on initial render and when screen is focused
  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          setLoading(true);
          await fetchAccount();
        } finally {
          setLoading(false);
        }
      })();
    }, [fetchAccount]),
  );

  return {
    account,
    transactions,
    isLoading,
    isRefreshing,
    fetchAccount,
    refreshAccount,
    accountRequestError,
    transactionsRequestError,
  };
};
