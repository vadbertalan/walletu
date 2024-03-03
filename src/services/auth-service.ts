import {Mnemonic} from '@multiversx/sdk-wallet';

export const getAddressFromMnemonic = (
  mnemonicStr: string,
  index: number = 0,
): string => {
  const mnemonic = Mnemonic.fromString(mnemonicStr);

  return mnemonic.deriveKey(index).generatePublicKey().toAddress().bech32();
};
