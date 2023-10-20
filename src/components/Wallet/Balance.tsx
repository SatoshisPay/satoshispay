import Decimal from 'decimal.js';
import React from 'react';
import { View, Text } from 'react-native';

import { getBTCEURTicker } from '../../api/ticker';
import { convertSatsToEUR } from '../../utils/conversion';

interface Props {
  satsBalance: Decimal;
  setError: (error: string) => void;
}

const Balance = ({ satsBalance, setError }: Props) => {
  const [fiatBalance, setFiatBalance] = React.useState(new Decimal(0));

  React.useEffect(() => {
    // get fiat balance
    getBTCEURTicker()
      .then(ticker => {
        setFiatBalance(convertSatsToEUR(ticker, satsBalance));
      })
      .catch(e => {
        setError(e.message);
      });
  }, [satsBalance]);

  return (
    <View className="flex flex-col items-center justify-center mx-auto p-8 mt-8 w-full">
      <Text className="text-3xl text-brandAlt">Bilancio attuale</Text>
      <Text className="text-2xl text-brandAlt">
        {satsBalance.toNumber().toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
          useGrouping: true,
        })}{' '}
        丰
      </Text>
      <Text className="text-xl text-brandAlt">{fiatBalance.toFixed(2)} €</Text>
    </View>
  );
};

export default Balance;
