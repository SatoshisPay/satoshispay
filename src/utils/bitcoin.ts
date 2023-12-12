import ECPairFactory from 'ecpair';
import * as tinySecp256k1 from '@bitcoinerlab/secp256k1';

const ECPair = ECPairFactory(tinySecp256k1);

export const privateKeyToWIF = (privateKey: number[]): string => {
  const buffer = Buffer.from(privateKey);
  const keyPair = ECPair.fromPrivateKey(buffer);
  const wif = keyPair.toWIF();

  return wif;
};
