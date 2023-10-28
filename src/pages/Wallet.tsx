import React from 'react';
import { Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Page, { RootStackParamList } from './pages';
import Activity from '../components/reusable/Activity';
import Balance from '../components/Wallet/Balance';
import Decimal from 'decimal.js';
import ErrorModal from '../components/shared/ErrorModal';
import { getBalance } from '../database/database';
import WithdrawalForm from '../components/Wallet/WithdrawalForm';
import { breezGetBalance, breezListPayments } from '../api/breez';

type Props = NativeStackScreenProps<RootStackParamList, Page.WALLET>;

const Wallet = ({}: Props) => {
  const [satsBalance, setSatsBalance] = React.useState(new Decimal(0));
  const [error, setError] = React.useState<string>();

  React.useEffect(() => {
    // TODO: fetch pending orders from API
    breezGetBalance()
      .then(balance => {
        setSatsBalance(balance.lnBalance);
      })
      .catch(e => {
        setError(e.message);
      });
  }, []);

  return (
    <Activity.ListPage>
      {error && (
        <ErrorModal error={error} onClick={() => setError(undefined)} />
      )}
      <Balance satsBalance={satsBalance} setError={setError} />
      <WithdrawalForm satsBalance={satsBalance} setError={setError} />
    </Activity.ListPage>
  );
};

export default Wallet;
