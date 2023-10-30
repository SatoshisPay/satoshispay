import { breezCheckPaymentForPendingTransactions } from '../api/breez';
import {
  cancelOrder,
  finalizeOrder,
  getPendingOrders,
} from '../database/database';

const ORDER_EXPIRATION_DAYS = 1;

/**
 * @description checks for pending orders and finalizes them if the payment has been received. Otherwise if they are too old, cancels them.
 */
const processPendingOrders = async (): Promise<void> => {
  const pendingOrders = await getPendingOrders();
  const confirmedOrders = await breezCheckPaymentForPendingTransactions(
    pendingOrders,
  );
  for (const order of confirmedOrders) {
    await finalizeOrder(undefined, order, []);
  }
  const remainingOrders = await getPendingOrders();
  for (const order of remainingOrders) {
    if (
      order.insertedAt.getTime() <
      Date.now() - ORDER_EXPIRATION_DAYS * 24 * 60 * 60 * 1000
    ) {
      await cancelOrder(order);
    }
  }
};

export default processPendingOrders;
