import Decimal from 'decimal.js';
import bip21 from 'bip21';
import { decode as decodeBolt11 } from 'light-bolt11-decoder';

export const isBtcAddress = (address: string): boolean => {
  return address.match(/^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/) !== null;
};

export const isBolt11 = (bolt11: string): boolean => {
  return (
    bolt11.match(
      /^(lnbc[0-9A-Za-z]*[02468BDFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz])$/,
    ) !== null
  );
};

export const parseBolt11Amount = (bolt11: string): Decimal | undefined => {
  const decodedBolt = decodeBolt11(bolt11);
  for (const section of decodedBolt.sections) {
    if (section.name === 'amount') {
      return new Decimal(section.value).divToInt(1000); // convert to sats
    }
  }

  return undefined;
};

export const parseBitcoinQRCode = async (
  data: string,
): Promise<{ address: string; amount?: Decimal }> => {
  if (!data.startsWith('bitcoin:')) {
    data = `bitcoin:${data}`;
  }

  const decoded = bip21.decode(data);
  let amount;

  if (decoded.options.amount) {
    amount = new Decimal(decoded.options.amount);
  }

  return {
    address: decoded.address,
    amount,
  };
};
