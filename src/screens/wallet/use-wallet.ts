import {useEffect, useState} from 'react';
import {Account} from 'src/types/account';
import {Transaction} from 'src/types/transaction';

const BASE_URL = 'https://testnet-api.multiversx.com' as const;

// TODO: rewrite with RTK Query
// TODO: extract API logic
export const useWallet = (address: string) => {
  const [account, setAccount] = useState<Account | undefined>();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [accountRequestError, setAccountRequestError] = useState<
    string | undefined
  >();
  const [transactionsRequestError, setTransactionsRequestError] = useState<
    string | undefined
  >();

  useEffect(() => {
    const fetchAccount = async () => {
      setIsLoading(true);

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
        setIsLoading(false);
      }
    };

    fetchAccount();
  }, [address]);

  return {
    account,
    transactions,
    isLoading,
    accountRequestError,
    transactionsRequestError,
  };
};
