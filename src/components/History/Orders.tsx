import React from 'react';
import { Text, View } from 'react-native';

import Order from '../../data/order';
import { getOrdersByDate, getOrdersCount } from '../../database/database';
import ErrorModal from '../shared/ErrorModal';
import OrderList from './Orders/OrderList';
import PageSelector from '../reusable/PageSelector';
import processPendingOrders from '../../task/collectHistory';
import Spinner from '../reusable/Spinner';

const MAX_ORDERS_PER_PAGE = 10;

interface Props {
  startDate: Date;
  endDate: Date;
}

const Orders = ({ startDate, endDate }: Props) => {
  const [pendingOrdersProcessed, setPendingOrdersProcessed] =
    React.useState<boolean>(false);
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [ordersCount, setOrdersCount] = React.useState<number>();
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const loadTransactions = () => {
    setLoading(true);

    getOrdersByDate(
      startDate,
      endDate,
      MAX_ORDERS_PER_PAGE,
      (page - 1) * MAX_ORDERS_PER_PAGE,
    )
      .then(ordersByDate => {
        setLoading(false);
        setOrders(ordersByDate);
      })
      .catch(err => {
        setLoading(false);
        setError(err.message);
      });
  };

  const orderView = () => {
    if (loading) {
      return (
        <Spinner bgColor="bg-transparent">
          <Text>Caricamento...</Text>
        </Spinner>
      );
    }

    const minPage = Math.max(1, page - 2);
    const maxPage = Math.min(
      Math.max(4, page + 2),
      ordersCount ? Math.ceil(ordersCount / MAX_ORDERS_PER_PAGE) : 0,
    );

    if (ordersCount) {
      return (
        <View className="flex flex-col justify-between">
          <PageSelector
            onChange={setPage}
            page={page}
            min={minPage}
            max={maxPage}
          />
          <OrderList orders={orders} />
          <PageSelector
            onChange={setPage}
            page={page}
            min={minPage}
            max={maxPage}
          />
        </View>
      );
    }

    return (
      <Text className="text-center text-lg">
        Non c'è nessuna transazione nell'intervallo inserito
      </Text>
    );
  };

  React.useEffect(() => {
    if (!pendingOrdersProcessed) {
      processPendingOrders()
        .then(() => {
          setPendingOrdersProcessed(true);
        })
        .catch(err => {
          setError(`Impossibile processare gli ordini vecchi: ${err.message}`);
        });
    }
  }, []);

  React.useEffect(() => {
    if (pendingOrdersProcessed) {
      getOrdersCount(startDate, endDate)
        .then(setOrdersCount)
        .catch(err => {
          setError(err.message);
        });
    }
  }, [pendingOrdersProcessed]);

  React.useEffect(() => {
    if (!loading) {
      loadTransactions();
    }
  }, [ordersCount, page]);

  React.useEffect(() => {
    if (pendingOrdersProcessed && ordersCount !== undefined) {
      getOrdersCount(startDate, endDate)
        .then(count => {
          setOrdersCount(count);
          setPage(1);
        })
        .catch(err => {
          setError(err.message);
        });
    }
  }, [startDate, endDate]);

  return (
    <View className="flex flex-col justify-start">
      {error && (
        <ErrorModal error={error} onClick={() => setError(undefined)} />
      )}
      <Text className="text-center text-2xl text-brandAlt">Transazioni</Text>
      {orderView()}
    </View>
  );
};

export default Orders;
