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
  sendPayment,
  SwapInfo,
  refund,
  inProgressSwap,
  BuyBitcoinProvider,
  buyBitcoin,
  LogEntry,
  setLogStream,
  prepareRedeemOnchainFunds,
  redeemOnchainFunds,
} from '@breeztech/react-native-breez-sdk';
import * as bip39 from 'bip39';
import Decimal from 'decimal.js';
import RNFS from 'react-native-fs';
import { DEVICE_KEY, DEVICE_CERT } from '@env';
import { getLnNodeMnemonic } from '../database/keystore';
import { finalizeOrder, getOrderByPaymentHash } from '../database/database';
import Order, { OrderStatus } from '../data/order';
import { convertStringToBytes } from '../utils/conversion';
import { info, log, warn } from '../utils/log';

var LOG_INITIALIZED = false;

export interface Withdrawals {
  pendingSwaps: ReverseSwapInfo[];
  lnWithdrawals: Payment[];
}

const onBreezEvent = (event: BreezEvent) => {
  info(`received event ${event.type}`);
  // Handle invoice paid
  if (event.type === BreezEventVariant.INVOICE_PAID) {
    getOrderByPaymentHash(event.details.paymentHash).then(order => {
      if (order) {
        order.status = OrderStatus.CONFIRMED;
        finalizeOrder(undefined, order, []).then(() => {
          info(`order ${order.id} confirmed`);
        });
      }
    });
  }
};

const logStream = (entry: LogEntry) => {
  LOG_INITIALIZED = true;
  log(entry.level, entry.line);
};

export const breezConnect = async () => {
  if (!LOG_INITIALIZED) {
    setLogStream(logStream).catch(e => console.error(e));
  }
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

  const path = breezWorkingDirectory();
  await RNFS.mkdir(path);
  config.workingDir = path;

  try {
    return await connect(config, seedNumeric, onBreezEvent);
  } catch (e: any) {
    if (e.message.includes('already initialized')) {
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
  const nInfo = await nodeInfo();
  const lnBalance = nInfo.channelsBalanceMsat;
  const onChainBalance = nInfo.onchainBalanceMsat;

  return {
    lnBalance: new Decimal(lnBalance).div(1000).round(),
    onChainBalance: new Decimal(onChainBalance).div(1000).round(),
  };
};

export const breezListPayments = async (): Promise<Payment[]> => {
  const payments = await listPayments({
    filters: [PaymentTypeFilter.RECEIVED],
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

export const breezSendPayment = async (
  bolt11: string,
  amount?: Decimal,
): Promise<string> => {
  let amountMsat;
  if (amount) {
    amountMsat = amount.mul(1000).toNumber();
  }

  const payment = await sendPayment({
    amountMsat,
    bolt11,
  });

  return payment.payment.id;
};

export const breezGetWithdrawLimits = async (
  amount: Decimal,
): Promise<{
  min: Decimal;
  max: Decimal;
}> => {
  const fees = await fetchReverseSwapFees({ sendAmountSat: amount.toNumber() });
  return {
    min: new Decimal(fees.min),
    max: new Decimal(fees.max),
  };
};

export const breezWithdrawSats = async (
  amount: Decimal,
  address: string,
  fee: number,
): Promise<string> => {
  const fees = await fetchReverseSwapFees({ sendAmountSat: amount.toNumber() });
  const response = await sendOnchain({
    amountSat: amount.toNumber(),
    onchainRecipientAddress: address,
    pairHash: fees.feesHash,
    satPerVbyte: fee,
  });
  return response.reverseSwapInfo.id;
};

export const breezGetPendingWithdrawals = async (): Promise<Withdrawals> => {
  const pendingSwaps = await inProgressReverseSwaps();
  const lnWithdrawals = await listPayments({
    filters: [PaymentTypeFilter.SENT],
    includeFailures: true,
  });
  return {
    pendingSwaps,
    lnWithdrawals,
  };
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

export const breezGetDepositAddress = async (): Promise<SwapInfo> => {
  const swapInfo = await receiveOnchain({});
  return swapInfo;
};

export const breezGetPendingDeposit = async (): Promise<SwapInfo | null> => {
  const deposit = await inProgressSwap();

  return deposit;
};

export const breezGetFailedDeposits = async (): Promise<SwapInfo[]> => {
  return await listRefundables();
};

export const breezRefundDeposit = async (
  address: string,
  swap: SwapInfo,
  fee: number,
): Promise<string> => {
  const result = await refund({
    swapAddress: swap.bitcoinAddress,
    toAddress: address,
    satPerVbyte: fee,
  });

  return result.refundTxId;
};

export const breezGetRecommendedFees = async (): Promise<RecommendedFees> => {
  return await recommendedFees();
};

const breezWorkingDirectory = (): string =>
  RNFS.DocumentDirectoryPath + '/breez-node';

export const breezRemoveDir = async () => {
  await RNFS.unlink(breezWorkingDirectory());
};

export const breezGetBuyBitcoinUrl = async (
  buyBitcoinProvider: BuyBitcoinProvider,
): Promise<string> => {
  const response = await buyBitcoin({
    provider: buyBitcoinProvider,
  });

  return response.url;
};

/**
 * @description redeem funds from a closed channel automatically by sending to the swap address
 */
export const breezRedeemClosedChannelFunds = async (): Promise<
  | {
      txId: string;
      sats: number;
    }
  | false
> => {
  const nodeInformation = await nodeInfo();
  const satsAmount = nodeInformation.onchainBalanceMsat / 1000;
  info('redeemable funds: ', satsAmount);
  if (satsAmount === 0) {
    return false;
  }
  // get minimum sendable amount
  const minAmount = (
    await fetchReverseSwapFees({
      sendAmountSat: satsAmount,
    })
  ).min;

  if (satsAmount < minAmount) {
    warn(
      'redeemable funds',
      satsAmount,
      'are less than minimum amount:',
      minAmount,
    );
    return false;
  }

  const fees = await breezGetRecommendedFees();

  const onChainAddress = (await receiveOnchain({})).bitcoinAddress;
  await prepareRedeemOnchainFunds({
    toAddress: onChainAddress,
    satPerVbyte: fees.hourFee,
  });

  const redeemOnChainFundsResponse = await redeemOnchainFunds({
    toAddress: onChainAddress,
    satPerVbyte: fees.hourFee,
  });

  const txid = redeemOnChainFundsResponse.txid;
  // convert txid to hex representation
  const hexTxid = Buffer.from(txid).toString('hex');

  return { txId: hexTxid, sats: satsAmount };
};
