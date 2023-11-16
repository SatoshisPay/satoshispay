import Decimal from 'decimal.js';

export default interface Withdrawal {
  id: string;
  recipient: string;
  fiatAmount: Decimal;
  satsAmount: Decimal;
  status: WithdrawalStatus;
  insertedAt: Date;
}

export enum WithdrawalStatus {
  COMPLETED = 'completed',
  IN_PROGRESS = 'inProgress',
  CANCELLED = 'cancelled',
}
