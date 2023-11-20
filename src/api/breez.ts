import {
  BreezEvent,
  EnvironmentType,
  NodeConfig,
  NodeConfigVariant,
  connect,
  defaultConfig,
  nodeInfo,
  disconnect,
  receivePayment,
  LnInvoice,
  listPayments,
  PaymentTypeFilter,
  Payment,
  BreezEventVariant,
  fetchReverseSwapFees,
  sendOnchain,
  recommendedFees,
  RecommendedFees,
  PaymentDetailsVariant,
  inProgressReverseSwaps,
  ReverseSwapInfo,
  receiveOnchain,
  listRefundables,
  SwapInfo,
  refund,
} from '@breeztech/react-native-breez-sdk';
import * as bip39 from 'bip39';
import Decimal from 'decimal.js';
import RNFS from 'react-native-fs';
import { DEVICE_KEY, DEVICE_CERT } from '@env';

import { getLnNodeMnemonic } from '../database/keystore';
import { finalizeOrder, getOrderByPaymentHash } from '../database/database';
import Order, { OrderStatus } from '../data/order';
import { convertStringToBytes } from '../utils/conversion';

const onBreezEvent = (event: BreezEvent) => {
  console.log(`received event ${event.type}`);
  // Handle invoice paid
  if (event.type === BreezEventVariant.INVOICE_PAID) {
    getOrderByPaymentHash(event.details.paymentHash).then(order => {
      if (order) {
        order.status = OrderStatus.CONFIRMED;
        finalizeOrder(undefined, order, []).then(() => {
          console.log(`order ${order.id} confirmed`);
        });
      }
    });
  }
};

export const breezConnect = async () => {
  const mnemonic = await getLnNodeMnemonic();
  const seed = await bip39.mnemonicToSeed(mnemonic);
  const seedNumeric = [];
  for (const byte of seed) {
    seedNumeric.push(byte);
  }
  const apiKey =
    '39bca1bf047e0cac054859ac66cd511dfe5bca5cd8b571975c965963254ba69f';

  const nodeConfig: NodeConfig = {
    type: NodeConfigVariant.GREENLIGHT,
    config: {
      partnerCredentials: {
        deviceCert: convertStringToBytes(DEVICE_CERT),
        deviceKey: convertStringToBytes(DEVICE_KEY),
      },
    },
  };

  const config = await defaultConfig(
    EnvironmentType.PRODUCTION,
    apiKey,
    nodeConfig,
  );

  const path = RNFS.DocumentDirectoryPath + '/breez-node';
  await RNFS.mkdir(path);
  config.workingDir = path;

  try {
    return await connect(config, seedNumeric, onBreezEvent);
  } catch (e: any) {
    if (e.message === 'already initialized') {
      return undefined;
    }

    throw e;
  }
};

export const breezDisconnect = async () => {
  return await disconnect();
};

export const breezRestart = async () => {
  await breezDisconnect();
  return await breezConnect();
};

export interface Balance {
  lnBalance: Decimal;
  onChainBalance: Decimal;
}

export const breezGetBalance = async (): Promise<Balance> => {
  const info = await nodeInfo();
  const lnBalance = info.channelsBalanceMsat;
  const onChainBalance = info.onchainBalanceMsat;

  return {
    lnBalance: new Decimal(lnBalance).div(1000).round(),
    onChainBalance: new Decimal(onChainBalance).div(1000).round(),
  };
};

export const breezListPayments = async (): Promise<Payment[]> => {
  const payments = await listPayments({
    filter: PaymentTypeFilter.RECEIVED,
  });

  return payments;
};

export const breezCreateInvoice = async (
  amount: Decimal,
): Promise<LnInvoice> => {
  const invoice = await receivePayment({
    amountMsat: amount.mul(1000).toNumber(),
    description: `invoice for ${amount} sats`,
  });

  return invoice.lnInvoice;
};

export const breezWithdrawSats = async (
  amount: Decimal,
  address: string,
): Promise<string> => {
  const fees = await fetchReverseSwapFees({ sendAmountSat: amount.toNumber() });
  const response = await sendOnchain({
    amountSat: amount.toNumber(),
    onchainRecipientAddress: address,
    pairHash: fees.feesHash,
    satPerVbyte: fees.min / 250,
  });
  return response.reverseSwapInfo.id;
};

export const breezGetWithdrawFee = async (): Promise<RecommendedFees> => {
  return await recommendedFees();
};

export const breezGetPendingWithdrawals = async (): Promise<
  ReverseSwapInfo[]
> => {
  return await inProgressReverseSwaps();
};

export const breezCheckPaymentForPendingTransactions = async (
  orders: Order[],
): Promise<Order[]> => {
  const confirmedOrders = [];
  const payments = await breezListPayments();
  for (const order of orders) {
    if (order.status === OrderStatus.PENDING) {
      const payment = payments.find(
        p =>
          p.details.type === PaymentDetailsVariant.LN &&
          p.details.data.paymentHash === order.paymentHash,
      );
      if (payment) {
        order.status = OrderStatus.CONFIRMED;
        confirmedOrders.push(order);
      }
    }
  }
  return confirmedOrders;
};

export const breezGetDepositAddress = async (): Promise<string> => {
  const swapInfo = await receiveOnchain({});
  return swapInfo.bitcoinAddress;
};

export const breezGetFailedDeposits = async (): Promise<SwapInfo[]> => {
  return await listRefundables();
};

export const breezRefundDeposit = async (
  address: string,
  swap: SwapInfo,
): Promise<string> => {
  const result = await refund({
    swapAddress: swap.bitcoinAddress,
    toAddress: address,
    satPerVbyte: 5,
  });

  return result.refundTxId;
};
