import Decimal from 'decimal.js';
import ECPairFactory from 'ecpair';
import * as tinySecp256k1 from '@bitcoinerlab/secp256k1';
import * as bitcoin from 'bitcoinjs-lib';

export default interface Address {
  address: string;
  privateKey: string;
  balance: Decimal;
  insertedAt: Date;
}

export const generateNewAddress = (): Address => {
  const ECPair = ECPairFactory(tinySecp256k1);
  const keypair = ECPair.makeRandom();
  const { address } = bitcoin.payments.p2pkh({
    pubkey: keypair.publicKey,
  });

  if (!address || !keypair.privateKey) {
    throw new Error('failed to generate address');
  }

  return {
    address,
    privateKey: keypair.privateKey.toString('hex'),
    balance: new Decimal(0),
    insertedAt: new Date(),
  };
};
