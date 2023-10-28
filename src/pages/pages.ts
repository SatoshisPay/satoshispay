enum Page {
  HOME = 'Home',
  HISTORY = 'History',
  BALANCE = 'Balance',
  TRANSACTION = 'Transaction',
  WAIT_FOR_PAYMENT = 'WaitForPayment',
  WALLET = 'Wallet',
}

export default Page;

export type RootStackParamList = {
  Home: undefined;
  History: undefined;
  Transaction: { charge: string; orderType: string };
  WaitForPayment: { orderId: string };
  Wallet: undefined;
};
