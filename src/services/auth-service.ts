import {Mnemonic} from '@multiversx/sdk-wallet';

export const getAddressFromMnemonic = (mnemonicStr: string): string => {
  const mnemonic = Mnemonic.fromString(mnemonicStr);

  return mnemonic.deriveKey(0).generatePublicKey().toAddress().bech32();
};
