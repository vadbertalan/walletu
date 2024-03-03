export type PastTransaction = {
  txHash: string;
  sender: string;
  receiver: string;
  value: string;
  timestamp: number;
  nonce: number;
};

export type PendingTransaction = {
  hash: string;
  sender: string;
  receiver: string;
  value: string;
};
