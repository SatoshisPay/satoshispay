import Decimal from 'decimal.js';
import Address from './address';

export enum TransactionStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
}

export default interface Transaction {
  hash: string;
  address: Address;
  value: Decimal;
  status: TransactionStatus;
  insertedAt: Date;
}
