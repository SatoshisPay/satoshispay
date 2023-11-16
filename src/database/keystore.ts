import * as Keychain from 'react-native-keychain';
import uuid from 'react-native-uuid';
import * as CryptoJS from 'react-native-crypto-js';
import * as bip39 from 'bip39';

const KEY = 'KEY';
const MNEMONIC = 'MNEMONIC';

/**
 * @description given a string returns encryption of it
 * @param address
 * @param privateKey
 */
export const encryptSecret = async (privateKey: string): Promise<string> => {
  const storeKey = await getStoreKey();
  return CryptoJS.AES.encrypt(privateKey, storeKey).toString();
};

export const decryptSecret = async (
  encryptedPrivateKey: string,
): Promise<string> => {
  const storeKey = await getStoreKey();
  let bytes = CryptoJS.AES.decrypt(encryptedPrivateKey, storeKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const getStoreKey = async (): Promise<string> => {
  const key = await Keychain.getGenericPassword({ service: KEY });

  if (key) {
    return key.password;
  }
  const newKey = uuid.v4().toString();
  await Keychain.setGenericPassword(KEY, newKey, { service: KEY });

  return newKey;
};

export const getLnNodeMnemonic = async (): Promise<string> => {
  const existingMnemonic = await Keychain.getGenericPassword({
    service: MNEMONIC,
  });

  if (existingMnemonic) {
    return existingMnemonic.password;
  }

  const entropy = [
    0x4a, 0xd7, 0x8e, 0x2b, 0xf1, 0x0c, 0x3a, 0x6f, 0x9e, 0x5d, 0x72, 0xb0,
    0x8f, 0x61, 0xe3, 0x2a,
  ];
  const mnemonic = bip39.entropyToMnemonic(Buffer.from(entropy));

  await setLnNodeMnemonic(mnemonic);

  return mnemonic;
};

export const setLnNodeMnemonic = async (mnemonic: string) => {
  await Keychain.setGenericPassword(MNEMONIC, mnemonic, { service: MNEMONIC });
};
