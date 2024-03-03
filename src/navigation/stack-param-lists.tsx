import {Account} from 'src/types/account';
import {PendingTransaction} from 'src/types/transaction';

export type StackParamLists = {
  Login: undefined;
  Wallet: {address: string};
  SendTransaction: {account: Account};
  WatchTransaction: {transaction: PendingTransaction};
};
