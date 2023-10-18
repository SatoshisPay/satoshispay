import Decimal from 'decimal.js';

enum Page {
  HOME = 'Home',
  HISTORY = 'History',
  BALANCE = 'Balance',
  TRANSACTION = 'Transaction',
}

export default Page;

export type RootStackParamList = {
  Home: undefined;
  History: undefined;
  Transaction: { charge: string };
};
