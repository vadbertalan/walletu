export const ENV = 'testnet' as const;

export const BASE_URL = `https://${ENV}-api.multiversx.com` as const;
export const WALLET_BASE_URL = `https://${ENV}-wallet.multiversx.com` as const;
export const EXPLORER_BASE_URL =
  `https://${ENV}-explorer.multiversx.com` as const;
export const DAPP_BASE_URL =
  `https://${ENV}.template-dapp.multiversx.com` as const;
