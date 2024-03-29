import React from 'react';
import { Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useBackHandler } from '@react-native-community/hooks';

import Page, { RootStackParamList } from './pages';
import { finalizeOrder, getOrderById } from '../database/database';
import ErrorModal from '../components/shared/ErrorModal';
import Transaction from '../data/transaction';
import Order, { OrderStatus, OrderType } from '../data/order';
import Receipt from '../components/WaitForPayment/Receipt';
import Activity from '../components/reusable/Activity';
import { breezListPayments } from '../api/breez';
import { PaymentDetailsVariant } from '@breeztech/react-native-breez-sdk';
import Spinner from '../components/reusable/Spinner';
import { warn } from '../utils/log';

type Props = NativeStackScreenProps<RootStackParamList, Page.WAIT_FOR_PAYMENT>;

const WaitForPayment = ({ route, navigation }: Props) => {
  const [order, setOrder] = React.useState<Order>();
  const [error, setError] = React.useState<string>();
  const [orderFullfilled, setOrderFullfilled] = React.useState(false);
  const [waitForTransactionWorker, setWaitForTransactionWorker] =
    React.useState<NodeJS.Timeout>();

  React.useEffect(() => {
    getOrderById(route.params.orderId)
      .then(orderById => {
        setOrder(orderById);
      })
      .catch(e => {
        setError(`could not find order: ${e.message}`);
      });
  }, [route.params.orderId]);

  // handle back button
  useBackHandler(() => {
    cancelWorker();
    navigation.navigate(Page.HOME);
    return true;
  });

  React.useEffect(() => {
    if (order) {
      const worker = setInterval(onWorkerTick, 5000);

      setWaitForTransactionWorker(worker);
    }
  }, [order]);

  // on umount clear the worker
  React.useEffect(() => {
    return () => {
      cancelWorker();
    };
  }, []);

  const onWorkerTick = () => {
    const worker = setInterval(() => {
      if (order && order.orderType === OrderType.LN && order.paymentHash) {
        getOrderById(order.id).then(orderById => {
          if (orderById.status === OrderStatus.PENDING) {
            breezListPayments()
              .then(payments => {
                const payment = payments.find(
                  p =>
                    p.details.type === PaymentDetailsVariant.LN &&
                    p.details.data.paymentHash === orderById.paymentHash,
                );
                if (payment) {
                  onTransactionFullfilled([]);
                  cancelWorker();
                }
              })
              .catch(e => {
                warn(e);
                setError("impossibile controllare le transazioni per l'ordine");
              });
          } else {
            setOrderFullfilled(true);
            cancelWorker();
          }
        });
      } else {
        // TODO: HANDLE BTC
      }
    }, 1000);

    setWaitForTransactionWorker(worker);
  };

  const onGoHomeClicked = () => {
    cancelWorker();
    navigation.navigate(Page.HOME);
  };

  const onTransactionFullfilled = (transactions: Transaction[]) => {
    if (order) {
      if (order.address) {
        order.address.balance.add(order.satsAmount);
      }

      finalizeOrder(order.address, order, transactions)
        .then(() => {
          setOrderFullfilled(true);
        })
        .catch(e => {
          setError(e.message);
        });
    }
  };

  const cancelWorker = () => {
    if (waitForTransactionWorker) {
      clearInterval(waitForTransactionWorker);
      setWaitForTransactionWorker(undefined);
    }
  };

  const onErrorDismiss = () => {
    cancelWorker();
    navigation.navigate(Page.HOME);
  };

  const orderStatus = orderFullfilled ? (
    <Receipt onGoHomeClicked={onGoHomeClicked} />
  ) : (
    <Spinner>
      <Text className="text-brandAlt w-full px-4 text-2xl text-center">
        Attendi mentre la{'\n'}transazione viene elaborata...
      </Text>
      <Text className="text-brandAlt w-full px-4 text-sm text-center mt-8">
        Puoi tornare alla home se vuoi,{'\n'}la transazione verrà registrata in
        background
      </Text>
    </Spinner>
  );

  return (
    <Activity.BrandPage>
      {orderStatus}
      {error && <ErrorModal error={error} onClick={onErrorDismiss} />}
    </Activity.BrandPage>
  );
};

export default WaitForPayment;
