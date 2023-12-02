enum Page {
  HOME = 'Home',
  BALANCE = 'Balance',
  HISTORY = 'History',
  INVOICE = 'Invoice',
  ONBOARDING = 'Onboarding',
  SETTINGS = 'Settings',
  STARTUP = 'Startup',
  WAIT_FOR_PAYMENT = 'WaitForPayment',
  WALLET = 'Wallet',
}

export default Page;

export type RootStackParamList = {
  Home: undefined;
  History: undefined;
  Invoice: { charge: string; orderType: string };
  Onboarding: undefined;
  Settings: undefined;
  Startup: undefined;
  WaitForPayment: { orderId: string };
  Wallet: undefined;
};
