import Decimal from 'decimal.js';
import uuid from 'react-native-uuid';

import Address from './address';

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
}

export enum OrderType {
  BTC = 'BTC',
  LN = 'LN',
}

export default interface Order {
  id: string;
  orderType: OrderType;
  address?: Address;
  bolt11?: string;
  status: OrderStatus;
  satsAmount: Decimal;
  fiatAmount: Decimal;
  insertedAt: Date;
  updatedAt: Date;
}

export const createOrderForAddress = (
  address: Address,
  satsAmount: Decimal,
  fiatAmount: Decimal,
): Order => ({
  id: uuid.v4().toString(),
  orderType: OrderType.BTC,
  address,
  status: OrderStatus.PENDING,
  satsAmount,
  fiatAmount,
  insertedAt: new Date(),
  updatedAt: new Date(),
});

export const createOrderForLnInvoice = (
  bolt11: string,
  satsAmount: Decimal,
  fiatAmount: Decimal,
): Order => ({
  id: uuid.v4().toString(),
  orderType: OrderType.LN,
  bolt11,
  status: OrderStatus.PENDING,
  satsAmount,
  fiatAmount,
  insertedAt: new Date(),
  updatedAt: new Date(),
});
