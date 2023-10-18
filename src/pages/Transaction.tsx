import React from 'react';
import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Page, { RootStackParamList } from './pages';
import Decimal from 'decimal.js';
import Address, { generateNewAddress } from '../data/address';
import Receipt from '../components/Transaction/Receipt';
import { getBTCEURTicker } from '../api/ticker';
import { convertEURToBTC } from '../utils/conversion';
import { insertAddressWithOrder } from '../database/database';
import ButtonBar from '../components/Transaction/ButtonBar';
import { createOrderForAddress } from '../data/order';

type Props = NativeStackScreenProps<RootStackParamList, Page.TRANSACTION>;

const Transaction = (props: Props): JSX.Element => {
  const { navigation } = props;
  const eurCharge = React.useMemo(
    () => new Decimal(props.route.params.charge),
    [props.route.params.charge],
  );
  const [address, setAddress] = React.useState<Address>();
  const [btcAmount, setBtcAmount] = React.useState<Decimal>();

  React.useEffect(() => {
    // get conversion rate
    getBTCEURTicker()
      .then(ticker => {
        setBtcAmount(convertEURToBTC(ticker, eurCharge));
      })
      .catch(e => {
        // TODO: handle error
        console.error(e);
      });
  }, []);

  React.useEffect(() => {
    if (!btcAmount) {
      return;
    }
    const address = generateNewAddress();
    const order = createOrderForAddress(address, btcAmount, eurCharge);
    // register address into database
    insertAddressWithOrder(address, order)
      .then(() => {
        setAddress(address);
      })
      .catch(e => {
        // TODO: handle error
        console.error(e);
      });
  }, [btcAmount]);

  // Event handlers
  const onCancel = () => {
    // TODO: ask confirmation and then cancel order
    navigation.goBack();
  };

  const onDone = () => {
    if (address) {
      navigation.push(Page.WAIT_FOR_PAYMENT, {
        address: address.address,
      });
    }
  };

  return (
    <View className="flex flex-col items-center justify-center w-full bg-brand h-full">
      {address && btcAmount && (
        <>
          <Receipt
            eurCharge={eurCharge}
            btcCharge={btcAmount}
            address={address}
          />
          <ButtonBar onCancel={onCancel} onDone={onDone} />
        </>
      )}
    </View>
  );
};

export default Transaction;
