import React from 'react';
import { BackHandler } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';

import Page, { RootStackParamList } from './pages';
import Decimal from 'decimal.js';
import Address, { generateNewAddress } from '../data/address';
import Receipt from '../components/Transaction/Receipt';
import { getBTCEURTicker } from '../api/ticker';
import { convertEURToSats } from '../utils/conversion';
import { cancelOrder, insertAddressWithOrder } from '../database/database';
import ButtonBar from '../components/Transaction/ButtonBar';
import Order, { OrderStatus, createOrderForAddress } from '../data/order';
import CancelModal from '../components/Transaction/CancelModal';
import Spinner from '../components/Transaction/Spinner';
import ErrorModal from '../components/shared/ErrorModal';
import Activity from '../components/reusable/Activity';

type Props = NativeStackScreenProps<RootStackParamList, Page.TRANSACTION>;

const Transaction = ({ route, navigation }: Props): JSX.Element => {
  const eurCharge = React.useMemo(
    () => new Decimal(route.params.charge),
    [route.params.charge],
  );
  const [address, setAddress] = React.useState<Address>();
  const [order, setOrder] = React.useState<Order>();
  const [satsAmount, setSatsAmount] = React.useState<Decimal>();
  const [transactionReady, setTransactionReady] =
    React.useState<boolean>(false);
  const [showCancelConfirmation, setShowCancelConfirmation] =
    React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  React.useEffect(() => {
    // get conversion rate
    getBTCEURTicker()
      .then(ticker => {
        setSatsAmount(convertEURToSats(ticker, eurCharge));
      })
      .catch(e => {
        setError('impossibile ottenere il cambio BTC attuale');
        console.error(e);
      });
  }, [eurCharge]);

  React.useEffect(() => {
    if (!satsAmount || !eurCharge) {
      return;
    }
    generateNewAddress().then(generatedAddress => {
      const newOrder = createOrderForAddress(
        generatedAddress,
        satsAmount,
        eurCharge,
      );
      setAddress(generatedAddress);
      setOrder(newOrder);
    });
  }, [satsAmount, eurCharge]);

  React.useEffect(() => {
    if (order && address) {
      // register address into database
      insertAddressWithOrder(address, order)
        .then(() => {
          setTransactionReady(true);
        })
        .catch(e => {
          setError('impossibile generare un indirizzo BTC');
          setError(e.message);
        });
    }
  }, [order, address]);

  // Handle back button
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        onCancelPressed();
        return true;
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );
      return () => subscription.remove();
    }, []),
  );

  const onCancelPressed = () => {
    setShowCancelConfirmation(true);
  };

  const onDismissModal = () => {
    setShowCancelConfirmation(false);
  };

  // Event handlers
  const onCancel = () => {
    if (order) {
      order.status = OrderStatus.CANCELLED;
      cancelOrder(order);
    }
    navigation.goBack();
  };

  const onDone = () => {
    if (address && order) {
      navigation.push(Page.WAIT_FOR_PAYMENT, {
        address: address.address,
        orderId: order.id,
      });
    }
  };

  return (
    <Activity.BrandPage>
      <CancelModal
        visible={showCancelConfirmation}
        onCancel={onCancel}
        onDismiss={onDismissModal}
      />
      {address && order && transactionReady && satsAmount && (
        <>
          <Receipt
            eurCharge={eurCharge}
            satsCharge={satsAmount}
            address={address}
          />
          <ButtonBar onCancel={onCancelPressed} onDone={onDone} />
        </>
      )}
      {!transactionReady && <Spinner />}
      {error && <ErrorModal error={error} onClick={onCancel} />}
    </Activity.BrandPage>
  );
};

export default Transaction;
