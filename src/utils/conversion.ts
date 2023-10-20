import Decimal from 'decimal.js';

// 1 BTC : eurValue = x : value
export const convertEURToBTC = (eurValue: Decimal, value: Decimal): Decimal =>
  value.dividedBy(eurValue);

export const convertBTCtoSats = (btcValue: Decimal): Decimal =>
  btcValue.times(100_000_000);

export const convertEURToSats = (eurValue: Decimal, value: Decimal): Decimal =>
  convertBTCtoSats(convertEURToBTC(eurValue, value)).round();
