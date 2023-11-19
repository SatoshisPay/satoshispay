enum Page {
  HOME = 'Home',
  HISTORY = 'History',
  BALANCE = 'Balance',
  ONBOARDING = 'Onboarding',
  SETTINGS = 'Settings',
  STARTUP = 'Startup',
  TRANSACTION = 'Transaction',
  WAIT_FOR_PAYMENT = 'WaitForPayment',
  WALLET = 'Wallet',
}

export default Page;

export type RootStackParamList = {
  Home: undefined;
  History: undefined;
  Onboarding: undefined;
  Settings: undefined;
  Startup: undefined;
  Transaction: { charge: string; orderType: string };
  WaitForPayment: { orderId: string };
  Wallet: undefined;
};
