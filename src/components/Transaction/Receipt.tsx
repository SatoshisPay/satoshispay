import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import { Text, View } from 'react-native';

import Decimal from 'decimal.js';

interface Props {
  address: string;
  satsCharge: Decimal;
  eurCharge: Decimal;
}

const Receipt = (props: Props) => (
  <View className="flex flex-col items-center justify-center bg-white px-8 py-8 rounded-xl">
    <QRCode
      value={props.address}
      size={256}
      color="#202020"
      backgroundColor="#ffffff"
    />
    <View className="flex flex-row items-center justify-center w-fit">
      <Text className="text-brandAlt text-2xl text-center py-4">
        {props.satsCharge.toNumber().toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
          useGrouping: true,
        })}{' '}
        丰
      </Text>
    </View>
    <Text className="text-brandAlt w-full text-xl text-center">
      {props.eurCharge.toFixed(2)} €
    </Text>
  </View>
);

export default Receipt;
