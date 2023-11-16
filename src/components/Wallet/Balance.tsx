import Decimal from 'decimal.js';
import React from 'react';
import { View, Text } from 'react-native';

import { convertSatsToEUR } from '../../utils/conversion';

interface Props {
  eurTicker?: Decimal;
  satsBalance: Decimal;
}

const Balance = ({ satsBalance, eurTicker }: Props) => {
  const fiatBalance = eurTicker
    ? convertSatsToEUR(eurTicker, satsBalance)
    : null;

  return (
    <View className="flex flex-col items-center justify-center mx-auto p-5 w-full">
      <Text className="text-3xl text-brandAlt">Bilancio attuale</Text>
      <Text className="text-2xl text-brandAlt">
        {satsBalance.toNumber().toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
          useGrouping: true,
        })}{' '}
        丰
      </Text>
      {fiatBalance ? (
        <Text className="text-xl text-brandAlt">
          {fiatBalance.toFixed(2)} €
        </Text>
      ) : null}
    </View>
  );
};

export default Balance;
