import Decimal from 'decimal.js';
import Order from './order';

export default interface Transaction {
  hash: string;
  order: Order;
  value: Decimal;
  insertedAt: Date;
  timestamp: Date;
}
