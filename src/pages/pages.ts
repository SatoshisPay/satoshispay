import Decimal from 'decimal.js';

enum Page {
  HOME = 'Home',
  HISTORY = 'History',
  BALANCE = 'Balance',
  TRANSACTION = 'Transaction',
  WAIT_FOR_PAYMENT = 'WaitForPayment',
}

export default Page;

export type RootStackParamList = {
  Home: undefined;
  History: undefined;
  Transaction: { charge: string };
  WaitForPayment: { address: string };
};
