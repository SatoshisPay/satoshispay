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
} from '@breeztech/react-native-breez-sdk';
import * as bip39 from 'bip39';
import Decimal from 'decimal.js';
import RNFS from 'react-native-fs';
import { getLnNodeMnemonic } from '../database/keystore';

const onBreezEvent = (event: BreezEvent) => {
  console.log(`received event ${event.type}`);
};

export const breezConnect = async () => {
  const mnemonic = await getLnNodeMnemonic();
  const seed = await bip39.mnemonicToSeed(mnemonic);
  const seedNumeric = [];
  for (const byte of seed) {
    seedNumeric.push(byte);
  }
  const inviteCode = '6CY8-FEYC';
  const apiKey =
    '39bca1bf047e0cac054859ac66cd511dfe5bca5cd8b571975c965963254ba69f';

  const nodeConfig: NodeConfig = {
    type: NodeConfigVariant.GREENLIGHT,
    config: {
      inviteCode,
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

  return await connect(config, seedNumeric, onBreezEvent);
};

export const breezDisconnect = async () => {
  return await disconnect();
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

export const breezCreateInvoice = async (
  amount: Decimal,
): Promise<LnInvoice> => {
  const invoice = await receivePayment({
    amountMsat: amount.mul(1000).toNumber(),
    description: `invoice for ${amount} sats`,
  });

  return invoice.lnInvoice;
};
