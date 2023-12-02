import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import { Text, View } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Decimal from 'decimal.js';

import Button from '../reusable/Button';
import { Copy } from 'react-native-feather';

interface Props {
  address: string;
  satsCharge: Decimal;
  eurCharge: Decimal;
}

const Receipt = ({ address, satsCharge, eurCharge }: Props) => {
  const onCopyInvoice = () => {
    Clipboard.setString(address);
  };

  return (
    <View className="flex flex-col items-center justify-center bg-white px-8 py-8 rounded-xl w-page shadow-xl border border-gray-200">
      <QRCode
        value={address}
        size={256}
        color="#202020"
        backgroundColor="#ffffff"
      />
      <View className="flex flex-row justify-between items-start">
        <View className="flex flex-col items-end justify-center flex-1">
          <View className="w-full">
            <Text className="text-brandAlt text-2xl text-right py-4">
              {satsCharge.toNumber().toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
                useGrouping: true,
              })}{' '}
              丰
            </Text>
          </View>
          <View className="w-full">
            <Text className="text-brandAlt text-2xl text-right">
              {eurCharge.toNumber().toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
                useGrouping: true,
              })}{' '}
              €
            </Text>
          </View>
        </View>
        <View className="flex items-center justify-center ml-8">
          <Button.Secondary onPress={onCopyInvoice}>
            <Copy width={16} height={16} className="text-brandAlt" />
          </Button.Secondary>
        </View>
      </View>
    </View>
  );
};

export default Receipt;
