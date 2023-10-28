import React from 'react';
import { View } from 'react-native';

import Order from '../../data/order';
import { getOrdersByDate, getOrdersCount } from '../../database/database';
import ErrorModal from '../shared/ErrorModal';
import OrderList from './OrderList';
import PageSelector from './PageSelector';
import { breezProcessPendingOrders } from '../../api/breez';

const MAX_ORDERS_PER_PAGE = 5;

const Orders = () => {
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [ordersCount, setOrdersCount] = React.useState<number>();
  const [page, setPage] = React.useState(1);
  const [error, setError] = React.useState<string>();

  React.useEffect(() => {
    getOrdersCount()
      .then(setOrdersCount)
      .catch(err => {
        setError(err.message);
      });
  }, []);

  const loadTransactions = () => {
    getOrdersByDate(MAX_ORDERS_PER_PAGE, (page - 1) * MAX_ORDERS_PER_PAGE)
      .then(ordersByDate => {
        // fetch pending orders
        breezProcessPendingOrders(ordersByDate)
          .then(processedOrders => {
            setOrders(processedOrders);
          })
          .catch(err => {
            setError(err.message);
          });
      })
      .catch(err => {
        setError(err.message);
      });
  };

  React.useEffect(() => {
    loadTransactions();
  }, [ordersCount, page, loadTransactions]);

  const minPage = Math.max(1, page - 2);
  const maxPage = Math.min(
    Math.max(4, page + 2),
    ordersCount ? ordersCount / MAX_ORDERS_PER_PAGE + 1 : 0,
  );

  return (
    <View className="flex flex-col justify-start">
      {error && (
        <ErrorModal error={error} onClick={() => setError(undefined)} />
      )}
      <View className="flex flex-col justify-between">
        <OrderList orders={orders} />
        {ordersCount ? (
          <PageSelector
            onChange={setPage}
            page={page}
            min={minPage}
            max={maxPage}
          />
        ) : null}
      </View>
    </View>
  );
};

export default Orders;
