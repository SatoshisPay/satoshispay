import Decimal from 'decimal.js';
import uuid from 'react-native-uuid';

import Address from './address';

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
}

export default interface Order {
  id: string;
  address: Address;
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
  address,
  status: OrderStatus.PENDING,
  satsAmount,
  fiatAmount,
  insertedAt: new Date(),
  updatedAt: new Date(),
});
