import React from 'react';
import { View, Text } from 'react-native';
import { Check, Clock, X } from 'react-native-feather';
import Withdrawal, { WithdrawalStatus } from '../../../data/withdrawal';

interface Props {
  withdrawal: Withdrawal;
}

const getWithdrawalStatus = (status: WithdrawalStatus) => {
  switch (status) {
    case WithdrawalStatus.IN_PROGRESS:
      return (
        <View className="flex flex-row items-center justify-center">
          <Clock width={24} height={24} className="text-brand" />
          <Text> In attesa</Text>
        </View>
      );
    case WithdrawalStatus.COMPLETED:
      return (
        <View className="flex flex-row items-center justify-center">
          <Check width={24} height={24} className="text-green-700" />
          <Text> Completata</Text>
        </View>
      );
    case WithdrawalStatus.CANCELLED:
    default:
      return (
        <View className="flex flex-row items-center justify-center">
          <X width={24} height={24} className="text-red-700" />
          <Text> Cancellata</Text>
        </View>
      );
  }
};

const WithdrawalItem = ({ withdrawal }: Props) => (
  <View className="flex flex-cols justify-between border-b border-gray-300 shadow-lg py-4 w-full px-2">
    <View className="flex flex-row justify-between items-center w-full px-2">
      <Text className="text-brandAlt text-xs">Swap ID: {withdrawal.id}</Text>
    </View>
    <View className="flex flex-row justify-between items-center w-full px-2">
      <Text className="text-brandAlt text-md">
        {withdrawal.insertedAt.toLocaleDateString(['it'])}{' '}
        {withdrawal.insertedAt.toLocaleTimeString(['it'])}
      </Text>
      <Text className="text-brandAlt text-md">
        {withdrawal.satsAmount.toFixed(0)} Sats
      </Text>
    </View>
    <View className="flex flex-row justify-between items-center w-full px-2">
      {getWithdrawalStatus(withdrawal.status)}
      <Text className="text-brandAlt text-xs">
        {withdrawal.fiatAmount.toFixed(2)} €
      </Text>
    </View>
  </View>
);

export default WithdrawalItem;
