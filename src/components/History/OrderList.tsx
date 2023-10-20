import React from 'react';
import { View, FlatList } from 'react-native';

import Order from '../../data/order';
import OrderItem from './OrderItem';

interface Props {
  orders: Order[];
}

const OrderList = ({ orders }: Props) => (
  <View className="flex">
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderItem order={item} />}
    />
  </View>
);

export default OrderList;
