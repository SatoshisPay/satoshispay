import Decimal from 'decimal.js';

export default interface Address {
  address: string;
  privateKey: string;
  balance: Decimal;
  insertedAt: Date;
}
