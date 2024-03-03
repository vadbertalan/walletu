import {Address, TokenTransfer, Transaction} from '@multiversx/sdk-core';
import {Mnemonic, UserSigner} from '@multiversx/sdk-wallet/out';
import {BASE_URL} from 'src/constants';

const recallAccountNonce = async (address: string): Promise<number> => {
  try {
    const response = await fetch(`${BASE_URL}/accounts/${address}`);
    const account = await response.json();

    console.debug('Recalled account.nonce:', account.nonce);

    return account.nonce;
  } catch (error) {
    console.debug('Error fetching account nonce:', error);
    throw new Error('Failed to fetch account nonce');
  }
};

const prepareTx = async (
  ownAddress: string,
  toAddress: string,
  xegld: string,
): Promise<Transaction> => {
  const nonce = await recallAccountNonce(ownAddress);

  const tx = new Transaction({
    nonce,
    sender: new Address(ownAddress),
    receiver: new Address(toAddress),
    value: TokenTransfer.egldFromAmount(xegld),

    gasLimit: 50000,
    chainID: 'T',
    version: 1,
  });

  // Sign the transaction
  const serializedTransaction = tx.serializeForSigning();
  const signer = new UserSigner(
    // TODO: Read this data from encrypted storage or from state
    Mnemonic.fromString(
      'insane depend jazz antique laugh sleep upon wagon burden cute subject fiber snow differ recycle three bus tray giant lobster example degree garlic cherry',
    ).deriveKey(0),
  );
  const signature = await signer.sign(serializedTransaction);
  tx.applySignature(signature);

  console.log(
    'Transaction signed with signature:',
    tx.getSignature().toString('hex'),
  );
  console.log('Transaction is ready to be sent:', tx.toSendable());

  return tx;
};

const sendTx = async (preparedTx: Transaction): Promise<string> => {
  try {
    const data = preparedTx.toSendable();
    const response = await fetch(`${BASE_URL}/transactions`, {
      body: JSON.stringify(data),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const body = await response.json();

    if (!response.ok) {
      const message = `Transaction request failed with status code ${
        response.status
      } and body ${JSON.stringify(body)}`;
      console.debug(message);
      throw new Error(message);
    }

    const transactionHash = body.txHash;
    console.log('Transaction sent! Hash:', transactionHash);
    return transactionHash;
  } catch (error) {
    console.debug('Error sending transaction:', error);
    throw new Error('Failed to send transaction');
  }
};

export const TransactionService = {
  prepareTx,
  sendTx,
};
