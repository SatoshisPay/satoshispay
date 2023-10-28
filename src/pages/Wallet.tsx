import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Page, { RootStackParamList } from './pages';
import Activity from '../components/reusable/Activity';
import Balance from '../components/Wallet/Balance';
import Decimal from 'decimal.js';
import ErrorModal from '../components/shared/ErrorModal';
import WithdrawalForm from '../components/Wallet/WithdrawalForm';
import { breezGetBalance } from '../api/breez';
import SuccessModal from '../components/shared/SuccessModal';

type Props = NativeStackScreenProps<RootStackParamList, Page.WALLET>;

const Wallet = ({}: Props) => {
  const [satsBalance, setSatsBalance] = React.useState(new Decimal(0));
  const [error, setError] = React.useState<string>();
  const [success, setSuccess] = React.useState<boolean>(false);

  React.useEffect(() => {
    fetchBalance();
  }, []);

  const onWithdraw = () => {
    setSuccess(true);
    fetchBalance();
  };

  const fetchBalance = () => {
    breezGetBalance()
      .then(balance => {
        setSatsBalance(balance.lnBalance);
      })
      .catch(e => {
        setError(e.message);
      });
  };

  return (
    <Activity.ListPage>
      {error && (
        <ErrorModal error={error} onClick={() => setError(undefined)} />
      )}
      {success && (
        <SuccessModal
          message={'Prelievo effettuato con successo!'}
          onClick={() => setSuccess(false)}
        />
      )}
      <Balance satsBalance={satsBalance} setError={setError} />
      <WithdrawalForm
        onWithdraw={onWithdraw}
        satsBalance={satsBalance}
        setError={setError}
      />
    </Activity.ListPage>
  );
};

export default Wallet;
