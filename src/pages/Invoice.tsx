import React from 'react';
import { Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useBackHandler } from '@react-native-community/hooks';

import Page, { RootStackParamList } from './pages';
import Decimal from 'decimal.js';
import Address, { generateNewAddress } from '../data/address';
import Receipt from '../components/Invoice/Receipt';
import { getBTCEURTicker } from '../api/ticker';
import { convertEURToSats } from '../utils/conversion';
import {
  cancelOrder,
  insertAddressWithOrder,
  insertLnOrder,
} from '../database/database';
import ButtonBar from '../components/Invoice/ButtonBar';
import Order, {
  OrderStatus,
  OrderType,
  createOrderForAddress,
  createOrderForLnInvoice,
} from '../data/order';
import CancelModal from '../components/Invoice/CancelModal';
import ErrorModal from '../components/shared/ErrorModal';
import Activity from '../components/reusable/Activity';
import { breezCreateInvoice } from '../api/breez';
import Spinner from '../components/reusable/Spinner';

type Props = NativeStackScreenProps<RootStackParamList, Page.INVOICE>;

const Invoice = ({ route, navigation }: Props): JSX.Element => {
  const eurCharge = React.useMemo(
    () => new Decimal(route.params.charge),
    [route.params.charge],
  );
  const [address, setAddress] = React.useState<Address | undefined>();
  const [order, setOrder] = React.useState<Order>();
  const [satsAmount, setSatsAmount] = React.useState<Decimal>();
  const [transactionAddress, setTransactionAddress] = React.useState<string>();
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
    if (route.params.orderType === OrderType.BTC) {
      generateNewAddress().then(generatedAddress => {
        const newOrder = createOrderForAddress(
          generatedAddress,
          satsAmount,
          eurCharge,
        );
        setAddress(generatedAddress);
        setOrder(newOrder);
      });
    } else {
      breezCreateInvoice(satsAmount)
        .then(invoice => {
          setTransactionAddress(invoice.bolt11);
          setOrder(
            createOrderForLnInvoice(invoice.paymentHash, satsAmount, eurCharge),
          );
        })
        .catch(e => {
          setError('impossibile generare un invoice LN');
          setError(e.message);
        });
    }

    /*
     */
  }, [satsAmount, eurCharge, route.params.orderType]);

  React.useEffect(() => {
    if (order) {
      // register address / order into database
      if (route.params.orderType === OrderType.BTC && address) {
        insertAddressWithOrder(address, order)
          .then(() => {
            setTransactionAddress(address.address);
          })
          .catch(e => {
            setError('impossibile generare un indirizzo BTC');
            setError(e.message);
          });
      } else {
        insertLnOrder(order).catch(e => {
          setError('impossibile generare una invoice LN');
          setError(e.message);
        });
      }
    }
  }, [order, address, route.params.orderType]);

  // Handle back button
  useBackHandler(() => {
    onCancelPressed();
    return true;
  });

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
    if (order) {
      navigation.push(Page.WAIT_FOR_PAYMENT, {
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
      {order && transactionAddress && satsAmount && (
        <View className="flex flex-col items-center justify-between h-full pt-8">
          <Receipt
            eurCharge={eurCharge}
            satsCharge={satsAmount}
            address={transactionAddress}
          />
          <ButtonBar onCancel={onCancelPressed} onDone={onDone} />
        </View>
      )}
      {(!transactionAddress || !order) && (
        <Spinner>
          <Text className="text-brandAlt w-full px-4 text-2xl text-center">
            Sto preparando l'ordine...
          </Text>
        </Spinner>
      )}
      {error && <ErrorModal error={error} onClick={onCancel} />}
    </Activity.BrandPage>
  );
};

export default Invoice;
