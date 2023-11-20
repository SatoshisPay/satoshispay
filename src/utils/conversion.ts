import Decimal from 'decimal.js';

// 1 BTC : eurValue = x : btc
export const convertEURToBTC = (eurValue: Decimal, btc: Decimal): Decimal =>
  btc.dividedBy(eurValue);

export const convertBTCtoSats = (btcValue: Decimal): Decimal =>
  btcValue.times(100_000_000);

export const convertSatsToBTC = (satsValue: Decimal): Decimal =>
  satsValue.dividedBy(100_000_000);

export const convertEURToSats = (eurValue: Decimal, value: Decimal): Decimal =>
  convertBTCtoSats(convertEURToBTC(eurValue, value)).round();

// 1 BTC : eurValue = btc : x
export const convertBTCToEUR = (eurValue: Decimal, btc: Decimal): Decimal =>
  btc.times(eurValue);

export const convertSatsToEUR = (eurValue: Decimal, sats: Decimal): Decimal =>
  convertBTCToEUR(eurValue, convertSatsToBTC(sats));

export const convertStringToBytes = (str: string): number[] => {
  const buffer = Buffer.from(str, 'utf8');
  const byteArray = Array.from(buffer);

  return byteArray;
};
