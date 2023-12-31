import React from 'react';
import { View, Text } from 'react-native';
import { Check, Clock, X } from 'react-native-feather';

import Order, { OrderStatus } from '../../../data/order';

interface Props {
  order: Order;
}

const getOrderStatus = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.PENDING:
      return (
        <View className="flex flex-row items-center justify-center">
          <Clock width={24} height={24} className="text-brand" />
          <Text className="text-text"> In attesa</Text>
        </View>
      );
    case OrderStatus.CONFIRMED:
      return (
        <View className="flex flex-row items-center justify-center">
          <Check width={24} height={24} className="text-green-700" />
          <Text className="text-text"> Completata</Text>
        </View>
      );
    case OrderStatus.CANCELLED:
    default:
      return (
        <View className="flex flex-row items-center justify-center">
          <X width={24} height={24} className="text-red-700" />
          <Text className="text-text"> Cancellata</Text>
        </View>
      );
  }
};

const OrderItem = ({ order }: Props) => {
  const status = getOrderStatus(order.status);

  return (
    <View className="flex flex-cols justify-between border-b border-gray-300 shadow-lg py-4 w-full">
      <View className="flex flex-row justify-between items-center w-full px-2">
        {order.address && (
          <Text className="text-brandAlt text-xs">{order.address.address}</Text>
        )}
        {order.paymentHash && (
          <Text className="text-brandAlt text-xs">
            {order.paymentHash.substring(0, 32)}
          </Text>
        )}
        <Text
          className={`${
            order.status === OrderStatus.CONFIRMED ? 'text-green-700' : ''
          }  text-lg`}>
          {order.fiatAmount.toFixed(2)} €
        </Text>
      </View>
      <View className="flex flex-row justify-between items-center w-full px-2">
        <Text className="text-gray-500 text-xs">
          {order.insertedAt.toLocaleDateString(['it'])}{' '}
          {order.insertedAt.toLocaleTimeString(['it'])}
        </Text>
        <Text
          className={`${
            order.status === OrderStatus.CONFIRMED ? 'text-green-700' : ''
          }  text-md`}>
          {order.satsAmount.toNumber().toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
            useGrouping: true,
          })}{' '}
          丰
        </Text>
      </View>
      <View className="flex flex-row justify-start items-center w-full px-2">
        {status}
      </View>
    </View>
  );
};

export default OrderItem;
