import * as Keychain from 'react-native-keychain';
import uuid from 'react-native-uuid';
import * as CryptoJS from 'react-native-crypto-js';
import * as bip39 from 'bip39';
import { generateEntropy } from '../utils/random';

const KEY = 'KEY';
const MNEMONIC = 'MNEMONIC';
const PIN = 'PIN';

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

/**
 * @description returns the key stored in the keychain. If it doesn't exist, it creates a new one
 * @returns
 */
const getStoreKey = async (): Promise<string> => {
  const key = await Keychain.getGenericPassword({ service: KEY });

  if (key) {
    return key.password;
  }
  const newKey = uuid.v4().toString();
  await Keychain.setGenericPassword(KEY, newKey, { service: KEY });

  return newKey;
};

/**
 * @description returns the mnemonic stored in the keychain. If it doesn't exist, it creates a new one
 * @returns
 */
export const getLnNodeMnemonic = async (): Promise<string> => {
  const existingMnemonic = await Keychain.getGenericPassword({
    service: MNEMONIC,
  });

  if (existingMnemonic) {
    return existingMnemonic.password;
  }

  return await createLnNodeMnemonic();
};

/**
 * @description creates a new mnemonic and stores it in the keychain
 * @returns
 */
export const createLnNodeMnemonic = async (): Promise<string> => {
  const entropy = generateEntropy();
  const mnemonic = bip39.entropyToMnemonic(Buffer.from(entropy));

  await setLnNodeMnemonic(mnemonic);

  return mnemonic;
};

export const setLnNodeMnemonic = async (mnemonic: string) => {
  await Keychain.setGenericPassword(MNEMONIC, mnemonic, { service: MNEMONIC });
};

/**
 * @description checks if the mnemonic is already set in the keychain
 */
export const isLnNodeMnemonicSet = async (): Promise<boolean> => {
  const key = await Keychain.getGenericPassword({ service: MNEMONIC });

  return key !== false;
};

/**
 * @description set secret pin for withdrawals
 * @param pin
 */
export const setPin = async (pin: string) => {
  await Keychain.setGenericPassword(PIN, pin, { service: PIN });
};

/**
 * @description verify the pin for withdrawals
 * @param pin
 * @returns whether they matches
 */
export const verifyPin = async (pin: string): Promise<boolean> => {
  const existingPin = await Keychain.getGenericPassword({ service: PIN });

  return existingPin !== false && existingPin.password === pin;
};

/**
 * @description reset all the data stored in the keychain
 */
export const resetStorage = async () => {
  await Keychain.resetGenericPassword({ service: KEY });
  await Keychain.resetGenericPassword({ service: MNEMONIC });
  await Keychain.resetGenericPassword({ service: PIN });
};
