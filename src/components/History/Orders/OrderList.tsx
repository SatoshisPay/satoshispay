import React from 'react';
import { View } from 'react-native';

import Order from '../../../data/order';
import OrderItem from './OrderItem';

interface Props {
  orders: Order[];
}

const OrderList = ({ orders }: Props) => (
  <View className="flex">
    {orders.map(order => (
      <OrderItem key={order.id} order={order} />
    ))}
  </View>
);

export default OrderList;
