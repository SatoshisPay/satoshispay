import * as Keychain from 'react-native-keychain';
import uuid from 'react-native-uuid';
import * as CryptoJS from 'react-native-crypto-js';

const KEY = 'KEY';

/**
 * @description given a BTC private key, returns an encrypted version of it
 * @param address
 * @param privateKey
 */
export const encryptPrivateKey = async (
  privateKey: string,
): Promise<string> => {
  const storeKey = await getStoreKey();
  return CryptoJS.AES.encrypt(privateKey, storeKey).toString();
};

export const decryptPrivateKey = async (
  encryptedPrivateKey: string,
): Promise<string> => {
  const storeKey = await getStoreKey();
  let bytes = CryptoJS.AES.decrypt(encryptedPrivateKey, storeKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const getStoreKey = async (): Promise<string> => {
  const key = await Keychain.getGenericPassword();
  if (key) {
    return key.password;
  }
  const newKey = uuid.v4().toString();
  await Keychain.setGenericPassword(KEY, newKey);

  return newKey;
};
