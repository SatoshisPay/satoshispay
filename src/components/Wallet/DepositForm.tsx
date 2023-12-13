import React from 'react';
import { View } from 'react-native';
import Decimal from 'decimal.js';

import FailedDeposits from './Deposit/FailedDeposits';
import Form from './Deposit/Form';
import History from './Deposit/History';

interface Props {
  eurTicker?: Decimal;
  onDeposit: () => void;
  setError: (error: string) => void;
}

const DepositForm = ({ eurTicker, onDeposit, setError }: Props) => {
  return (
    <View className="w-full">
      <Form eurTicker={eurTicker} onDeposit={onDeposit} setError={setError} />
      <FailedDeposits setError={setError} />
      <History setError={setError} />
    </View>
  );
};

export default DepositForm;
