import Decimal from 'decimal.js';

const apiUrl = 'https://blockchain.info/ticker';

/**
 * Get the current BTC/EUR 1BTC = x EUR
 */
export const getBTCEURTicker = async (): Promise<Decimal> => {
  const response = await fetch(apiUrl);
  const data = await response.json();

  return new Decimal(data.EUR.last);
};
