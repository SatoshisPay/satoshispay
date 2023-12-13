import React from 'react';
import { SwapInfo } from '@breeztech/react-native-breez-sdk';
import { View, Text } from 'react-native';
import { Clock } from 'react-native-feather';

interface Props {
  swap: SwapInfo;
}

const FailedDepositItem = ({ swap }: Props) => (
  <View className="flex flex-cols justify-between border-b border-gray-300 shadow-lg py-4 w-full px-2">
    <View className="flex flex-row justify-between items-center w-full px-2">
      <Text className="text-brandAlt text-xs">
        Inviato da: {swap.bitcoinAddress}
      </Text>
    </View>
    <View className="flex flex-row justify-between items-center w-full px-2">
      {swap.confirmedTxIds.length > 1 && (
        <Text className="text-brandAlt text-xs">
          Transazioni confermate: {swap.confirmedTxIds.join(', ')}
        </Text>
      )}
    </View>
    <View className="flex flex-row justify-between items-center w-full px-2">
      <View className="flex flex-row items-center justify-center">
        <Clock width={24} height={24} className="text-brand mr-2" />
        <Text>{new Date(swap.createdAt).toLocaleDateString(['it'])}</Text>
      </View>
      <Text className="text-brandAlt text-xl">{swap.paidSats} Sats</Text>
    </View>
  </View>
);

export default FailedDepositItem;
