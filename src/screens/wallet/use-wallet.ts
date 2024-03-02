import {useEffect, useState} from 'react';

const BASE_URL = 'https://testnet-api.multiversx.com' as const;

// TODO: extract API logic
export const useWallet = (address: string) => {
  const [account, setAccount] = useState<any | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [requestError, setRequestError] = useState<string | undefined>();

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        setIsLoading(true);
        setRequestError(undefined);

        const response = await fetch(`${BASE_URL}/accounts/${address}`);

        if (!response.ok) {
          throw new Error(`Request failed with status code ${response.status}`); // Throw an error if the response is not ok
        }

        const data = await response.json();
        setAccount(data);
      } catch (error) {
        console.debug('Error fetching account information:', error);
        setRequestError('Failed to fetch account information');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccount();
  }, [address]);

  return {account, isLoading, requestError};
};
