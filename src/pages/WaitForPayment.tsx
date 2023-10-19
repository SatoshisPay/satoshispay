import React from 'react';
import { BackHandler, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';

import Page, { RootStackParamList } from './pages';
import Address from '../data/address';
import {
  finalizeOrder,
  getAddressByAddress,
  getOrderById,
} from '../database/database';
import ErrorModal from '../components/shared/ErrorModal';
import Spinner from '../components/WaitForPayment/Spinner';
import Transaction from '../data/transaction';
import Order from '../data/order';
import Receipt from '../components/WaitForPayment/Receipt';

type Props = NativeStackScreenProps<RootStackParamList, Page.WAIT_FOR_PAYMENT>;

const WaitForPayment = ({ route, navigation }: Props) => {
  const [address, setAddress] = React.useState<Address>();
  const [order, setOrder] = React.useState<Order>();
  const [error, setError] = React.useState<string>();
  const [orderFullfilled, setOrderFullfilled] = React.useState(false);
  const [waitForTransactionWorker, setWaitForTransactionWorker] =
    React.useState<NodeJS.Timeout>();

  React.useEffect(() => {
    getAddressByAddress(route.params.address)
      .then(address => {
        setAddress(address);
      })
      .catch(e => {
        setError(e.message);
      });
  }, [route.params.address]);

  React.useEffect(() => {
    getOrderById(route.params.orderId)
      .then(order => {
        setOrder(order);
      })
      .catch(e => {
        setError(`could not find order: ${e.message}`);
      });
  }, [route.params.orderId]);

  // handle back button
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        cancelWorker();
        navigation.navigate(Page.HOME);
        return true;
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );
      return () => subscription.remove();
    }, []),
  );

  React.useEffect(() => {
    if (address && order) {
      const worker = setInterval(onWorkerTick, 5000);

      setWaitForTransactionWorker(worker);
    }
  }, [address, order]);

  // on umount clear the worker
  React.useEffect(() => {
    return () => {
      cancelWorker();
    };
  }, []);

  const onWorkerTick = () => {
    // TODO: wait for transaction
  };

  const onGoHomeClicked = () => {
    cancelWorker();
    navigation.navigate(Page.HOME);
  };

  const onTransactionFullfilled = (transactions: Transaction[]) => {
    if (address && order) {
      finalizeOrder(address, order, transactions)
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
    <Spinner />
  );

  return (
    <View className="flex flex-col items-center justify-center w-full bg-brand h-full">
      {orderStatus}
      {error && <ErrorModal error={error} onClick={onErrorDismiss} />}
    </View>
  );
};

export default WaitForPayment;
