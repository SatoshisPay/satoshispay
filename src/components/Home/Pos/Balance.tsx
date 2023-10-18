import Decimal from 'decimal.js';
import React from 'react';
import { View, Text } from 'react-native';

interface Props {
  balance: Decimal;
}

const formatBalance = (balance: Decimal): string => {
  // prepend 0 if balance is less than 10
  const prefix = balance.lessThan(10) ? '0' : '';
  return `${prefix}${balance.toFixed(2).replace('.', ',')} €`;
};

const Balance = (props: Props) => (
  <View className="w-full p-8 rounded-xl">
    <Text className="text-6xl text-center text-brandAlt">
      {formatBalance(props.balance)}
    </Text>
  </View>
);

export default Balance;
