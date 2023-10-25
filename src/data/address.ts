import Decimal from 'decimal.js';
import ECPairFactory from 'ecpair';
import * as tinySecp256k1 from '@bitcoinerlab/secp256k1';
import * as bip39 from 'bip39';
import BIP32Factory from 'bip32';
import * as bitcoin from 'bitcoinjs-lib';
import { encryptSecret } from '../database/keystore';

const ECPair = ECPairFactory(tinySecp256k1);
const bip32 = BIP32Factory(tinySecp256k1);
const getRandomValues = global.crypto.getRandomValues;

export default interface Address {
  address: string;
  mnemonic: string;
  privateKey: string;
  balance: Decimal;
  insertedAt: Date;
}

export const generateNewAddress = async (): Promise<Address> => {
  const randomBytes = new Uint8Array(16);
  const entropy = getRandomValues(randomBytes);
  const mnemonic = bip39.entropyToMnemonic(Buffer.from(entropy));

  const seed = await bip39.mnemonicToSeed(mnemonic);
  const network = bitcoin.networks.bitcoin;

  const root = bip32.fromSeed(seed, network);
  const node = root.derivePath("m/44'/0'/0'/0/0");
  const keyPair = ECPair.fromWIF(node.toWIF(), network);
  const { address } = bitcoin.payments.p2wpkh({
    pubkey: keyPair.publicKey,
    network,
  });

  if (!address || !keyPair.privateKey) {
    throw new Error('failed to generate address');
  }

  const privateKey = keyPair.privateKey.toString('hex');
  const encryptedPrivateKey = await encryptSecret(privateKey);
  const encryptedMnemonic = await encryptSecret(mnemonic);

  return {
    address,
    mnemonic: encryptedMnemonic,
    privateKey: encryptedPrivateKey,
    balance: new Decimal(0),
    insertedAt: new Date(),
  };
};
