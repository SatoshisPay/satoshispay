import Decimal from 'decimal.js';

export const encodeBIP21 = (address: string, amount?: Decimal.Value) => {
  const uri = `bitcoin:${address}`;
  if (amount) {
    return `${uri}?amount=${amount}`;
  }
  return uri;
};
