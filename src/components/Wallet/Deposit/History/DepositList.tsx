import React from 'react';
import { Text, View } from 'react-native';

import Deposit, { DepositStatus } from '../../../../data/deposit';
import { AlertTriangle, Check, Clock, X } from 'react-native-feather';

interface Props {
  deposits: Deposit[];
}

const DepositList = ({ deposits }: Props) => (
  <View className="flex w-full">
    {deposits.map(deposit => (
      <Item key={deposit.id} deposit={deposit} />
    ))}
  </View>
);

export default DepositList;

const Item = ({ deposit }: { deposit: Deposit }) => {
  const status = getDepositStatus(deposit.status);

  return (
    <View className="flex flex-cols justify-between border-b border-gray-300 shadow-lg py-4 w-full">
      <View className="flex flex-row justify-between items-center w-full px-2">
        <Text className="text-brandAlt text-xs">{deposit.address}</Text>
      </View>
      <View className="flex flex-row justify-between items-center w-full px-2">
        <Text className="text-gray-500 text-xs">
          {deposit.insertedAt.toLocaleDateString(['it'])}{' '}
          {deposit.insertedAt.toLocaleTimeString(['it'])}
        </Text>
        <View>
          <Text
            className={`${
              deposit.status === DepositStatus.COMPLETED ? 'text-green-700' : ''
            }  text-lg`}>
            {deposit.fiatAmount.toFixed(2)} €
          </Text>
          <Text
            className={`${
              deposit.status === DepositStatus.COMPLETED ? 'text-green-700' : ''
            }  text-md`}>
            {deposit.satsAmount.toNumber().toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
              useGrouping: true,
            })}{' '}
            丰
          </Text>
        </View>
      </View>
      <View className="flex flex-row justify-start items-center w-full px-2">
        {status}
      </View>
    </View>
  );
};

const getDepositStatus = (status: DepositStatus) => {
  switch (status) {
    case DepositStatus.IN_PROGRESS:
      return (
        <View className="flex flex-row items-center justify-center">
          <Clock width={24} height={24} className="text-brand" />
          <Text className="text-text"> In attesa</Text>
        </View>
      );
    case DepositStatus.COMPLETED:
      return (
        <View className="flex flex-row items-center justify-center">
          <Check width={24} height={24} className="text-green-700" />
          <Text className="text-text"> Completato</Text>
        </View>
      );
    case DepositStatus.REFUNDABLE:
      return (
        <View className="flex flex-row items-center justify-center">
          <AlertTriangle width={24} height={24} className="text-brand" />
          <Text className="text-text"> Rimborsabile</Text>
        </View>
      );
    case DepositStatus.REFUNDED:
    default:
      return (
        <View className="flex flex-row items-center justify-center">
          <X width={24} height={24} className="text-red-700" />
          <Text className="text-text"> Rimborsato</Text>
        </View>
      );
  }
};
