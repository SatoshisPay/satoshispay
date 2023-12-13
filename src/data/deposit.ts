import Decimal from 'decimal.js';

export default interface Deposit {
  id: string;
  address: string;
  privateKey: string;
  fiatAmount: Decimal;
  satsAmount: Decimal;
  status: DepositStatus;
  insertedAt: Date;
}

export enum DepositStatus {
  COMPLETED = 'completed',
  IN_PROGRESS = 'inProgress',
  REFUNDABLE = 'refundable',
  REFUNDED = 'refunded',
}
