import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import { Text, View } from 'react-native';

import Address from '../../data/address';
import Decimal from 'decimal.js';
import { Path, Svg } from 'react-native-svg';

interface Props {
  address: Address;
  btcCharge: Decimal;
  eurCharge: Decimal;
}

const Receipt = (props: Props) => (
  <View className="flex flex-col items-center justify-center bg-white px-2 py-8 rounded-xl">
    <QRCode
      value={props.address.address}
      size={256}
      color="#202020"
      backgroundColor="#ffffff"
    />
    <Text className="text-brandAlt w-full px-4 text-sm text-center">
      {props.address.address}
    </Text>
    <View className="flex flex-row items-center justify-center w-fit">
      <Text className="text-brandAlt text-2xl text-center py-4">
        {props.btcCharge.toFixed(16)}
      </Text>
      <Svg width="24" height="24" fill="#4D4D4D" viewBox="0 0 16 16">
        <Path d="M5.5 13v1.25c0 .138.112.25.25.25h1a.25.25 0 0 0 .25-.25V13h.5v1.25c0 .138.112.25.25.25h1a.25.25 0 0 0 .25-.25V13h.084c1.992 0 3.416-1.033 3.416-2.82 0-1.502-1.007-2.323-2.186-2.44v-.088c.97-.242 1.683-.974 1.683-2.19C11.997 3.93 10.847 3 9.092 3H9V1.75a.25.25 0 0 0-.25-.25h-1a.25.25 0 0 0-.25.25V3h-.573V1.75a.25.25 0 0 0-.25-.25H5.75a.25.25 0 0 0-.25.25V3l-1.998.011a.25.25 0 0 0-.25.25v.989c0 .137.11.25.248.25l.755-.005a.75.75 0 0 1 .745.75v5.505a.75.75 0 0 1-.75.75l-.748.011a.25.25 0 0 0-.25.25v1c0 .138.112.25.25.25L5.5 13zm1.427-8.513h1.719c.906 0 1.438.498 1.438 1.312 0 .871-.575 1.362-1.877 1.362h-1.28V4.487zm0 4.051h1.84c1.137 0 1.756.58 1.756 1.524 0 .953-.626 1.45-2.158 1.45H6.927V8.539z" />
      </Svg>
    </View>
    <Text className="text-brandAlt w-full text-xl text-center">
      {props.eurCharge.toFixed(2)} €
    </Text>
  </View>
);

export default Receipt;
