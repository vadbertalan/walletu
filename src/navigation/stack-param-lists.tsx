import {Account} from 'src/types/account';

export type StackParamLists = {
  Login: undefined;
  Wallet: {address: string};
  SendTransaction: {account: Account};
};
