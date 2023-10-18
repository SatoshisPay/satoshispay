import Decimal from 'decimal.js';

export const convertEURToBTC = (eurValue: Decimal, value: Decimal): Decimal => {
  // 1 BTC : eurValue = x : value
  return value.dividedBy(eurValue);
};
