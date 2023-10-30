import {
  ReverseSwapInfo,
  ReverseSwapStatus,
} from '@breeztech/react-native-breez-sdk';
import React from 'react';
import { View, Text } from 'react-native';
import { Clock } from 'react-native-feather';

interface Props {
  swap: ReverseSwapInfo;
}

const statusToStr = (status: ReverseSwapStatus) => {
  switch (status) {
    case ReverseSwapStatus.IN_PROGRESS:
      return 'In attesa';

    case ReverseSwapStatus.CANCELLED:
      return 'Cancellato';

    case ReverseSwapStatus.COMPLETED_CONFIRMED:
      return 'Confermato';

    case ReverseSwapStatus.INITIAL:
      return 'Inizializzazione';

    case ReverseSwapStatus.COMPLETED_SEEN:
      return 'Completato';

    default:
      return status;
  }
};

const WithdrawalItem = ({ swap }: Props) => (
  <View className="flex flex-cols justify-between border-b border-gray-300 shadow-lg py-4 w-full px-2">
    <View className="flex flex-row justify-between items-center w-full px-2">
      <Text className="text-brandAlt text-xs">Swap ID: {swap.id}</Text>
      <Text className="text-brandAlt text-xs">
        {swap.onchainAmountSat} Sats
      </Text>
    </View>
    <View className="flex flex-row justify-between items-center w-full px-2">
      {swap.lockupTxid && (
        <Text className="text-brandAlt text-xs">
          Lockup TX id: {swap.lockupTxid}
        </Text>
      )}
    </View>
    <View className="flex flex-row justify-between items-center w-full px-2">
      {swap.claimTxid && (
        <Text className="text-brandAlt text-xs">
          Claim TX id: {swap.claimTxid}
        </Text>
      )}
      <View className="flex flex-row items-center justify-center">
        <Clock width={24} height={24} className="text-brand mr-2" />
        <Text>{statusToStr(swap.status)}</Text>
      </View>
    </View>
  </View>
);

export default WithdrawalItem;
