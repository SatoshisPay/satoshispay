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
import PendingWithdrawals from '../components/Wallet/PendingWithdrawals';
import ViewSwitch from '../components/reusable/ViewSwitch';
import { getBTCEURTicker } from '../api/ticker';
import { View } from 'react-native';
import DepositForm from '../components/Wallet/DepositForm';

type Props = NativeStackScreenProps<RootStackParamList, Page.WALLET>;

enum WalletMode {
  WITHDRAW,
  DEPOSIT,
}

const Wallet = ({}: Props) => {
  const [satsBalance, setSatsBalance] = React.useState(new Decimal(0));
  const [error, setError] = React.useState<string>();
  const [success, setSuccess] = React.useState<boolean>(false);
  const [walletMode, setWalletMode] = React.useState<WalletMode>(
    WalletMode.WITHDRAW,
  );
  const [eurTicker, setEurTicker] = React.useState<Decimal>();

  const onWalletModeChange = (mode: WalletMode) => {
    setWalletMode(mode);
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

  React.useEffect(() => {
    getBTCEURTicker()
      .then(dec => {
        setEurTicker(dec);
      })
      .catch(() => {
        setError('Impossibile ottenere il cambio attuale BTC/EUR');
      });
    fetchBalance();
  }, []);

  const onWithdraw = () => {
    setSuccess(true);
    fetchBalance();
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
      <Balance satsBalance={satsBalance} eurTicker={eurTicker} />
      <View className="pb-4">
        <ViewSwitch
          onChange={onWalletModeChange}
          selected={walletMode}
          tabs={[
            { title: 'Prelievo', value: WalletMode.WITHDRAW },
            { title: 'Deposito', value: WalletMode.DEPOSIT },
          ]}
        />
      </View>
      {walletMode === WalletMode.WITHDRAW ? (
        <>
          <WithdrawalForm
            onWithdraw={onWithdraw}
            satsBalance={satsBalance}
            setError={setError}
            eurTicker={eurTicker}
          />
          <PendingWithdrawals setError={setError} />
        </>
      ) : null}
      {walletMode === WalletMode.DEPOSIT ? (
        <DepositForm setError={setError} />
      ) : null}
    </Activity.ListPage>
  );
};

export default Wallet;
