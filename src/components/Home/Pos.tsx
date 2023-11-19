import Decimal from 'decimal.js';
import React from 'react';
import { Text, View } from 'react-native';
import Balance from './Pos/Balance';
import Digit from './Pos/Digit';
import ActionButton from './Pos/ActionButton';
import { ArrowLeft, Check, X } from 'react-native-feather';
import { breezGetBalance } from '../../api/breez';
import { getBTCEURTicker } from '../../api/ticker';
import { convertEURToSats } from '../../utils/conversion';
import Alerts from '../reusable/Alerts';

interface Props {
  amount: Decimal;
  setAmount: (amount: Decimal) => void;
  onSubmitted: (amount: Decimal) => void;
}

const Pos = ({ amount, setAmount, onSubmitted }: Props): JSX.Element => {
  const [cursor, setCursor] = React.useState(0);
  const [lnBalance, setLnBalance] = React.useState<Decimal>();
  const [eurTicker, setEurTicker] = React.useState<Decimal>();
  const [satsAmount, setSatsAmount] = React.useState<Decimal>();
  const [showAlert, setShowAlert] = React.useState<boolean>(false);

  const onDigitClicked = (digit: number) => {
    const newAmount = amount.mul(10).plus(digit / 100);
    setAmount(newAmount);
    setCursor(cursor + 1);
  };

  const onDoubleZeroClicked = () => {
    const newAmount = amount.mul(100).plus(0 / 100);
    setAmount(newAmount);
    setCursor(cursor + 2);
  };

  const onCancel = () => {
    setAmount(new Decimal(0));
    setCursor(0);
  };

  const onBack = () => {
    if (cursor === 0) {
      return;
    }
    if (cursor === 1) {
      onCancel();
      return;
    }
    const newAmount = amount.div(10).toDecimalPlaces(2);
    setAmount(newAmount);
    setCursor(cursor - 1);
  };

  const onSubmit = () => {
    if (amount.isZero()) {
      return;
    }

    setAmount(new Decimal(0));
    setCursor(0);

    onSubmitted(amount);
  };

  React.useEffect(() => {
    if (amount && eurTicker) {
      setSatsAmount(convertEURToSats(eurTicker, amount));
    }
  }, [amount, eurTicker]);

  React.useEffect(() => {
    if (satsAmount && lnBalance) {
      setShowAlert(satsAmount.greaterThan(lnBalance));
    }
  }, [satsAmount, lnBalance]);

  React.useEffect(() => {
    if (!lnBalance) {
      breezGetBalance()
        .then(balance => {
          setLnBalance(balance.lnBalance);
        })
        .catch(err => {
          console.error(err);
        });
    }

    if (!eurTicker) {
      getBTCEURTicker()
        .then(ticker => {
          setEurTicker(ticker);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, []);

  return (
    <View className="flex flex-col items-center justify-center w-full h-full bg-slate-100">
      {showAlert && satsAmount ? (
        <Alerts.Warning>
          <Text className="overflow-auto">
            Non hai abbastanza liquidità nel wallet.
          </Text>
          <Text className="overflow-auto">
            Questa transazione sarà soggetta a commissioni.
          </Text>
          <Text className="overflow-auto">
            Se vuoi evitare di pagare commissioni,{'\n'} deposita almeno{' '}
            {satsAmount.toFixed(2)} Sats.
          </Text>
        </Alerts.Warning>
      ) : null}
      <View className="flex items-center justify-center">
        <Balance balance={amount} />
      </View>
      <View className="flex flex-row items-center justify-center w-full">
        <Digit value={1} onDigitClicked={onDigitClicked} />
        <Digit value={2} onDigitClicked={onDigitClicked} />
        <Digit value={3} onDigitClicked={onDigitClicked} />
        <ActionButton onClicked={onCancel}>
          <X className="text-red-500" width={32} height={32} />
        </ActionButton>
      </View>
      <View className="flex flex-row items-center justify-center">
        <Digit value={4} onDigitClicked={onDigitClicked} />
        <Digit value={5} onDigitClicked={onDigitClicked} />
        <Digit value={6} onDigitClicked={onDigitClicked} />
        <ActionButton onClicked={onBack}>
          <ArrowLeft className="text-brand" width={32} height={32} />
        </ActionButton>
      </View>
      <View className="flex flex-row items-center justify-center">
        <Digit value={7} onDigitClicked={onDigitClicked} />
        <Digit value={8} onDigitClicked={onDigitClicked} />
        <Digit value={9} onDigitClicked={onDigitClicked} />
        <ActionButton onClicked={onSubmit}>
          <Check className="text-green-500" width={32} height={32} />
        </ActionButton>
      </View>
      <View className="flex flex-row items-center justify-center">
        <Digit value={0} onDigitClicked={onDigitClicked} />
        <Digit value={0} text="00" onDigitClicked={onDoubleZeroClicked} />
      </View>
    </View>
  );
};

export default Pos;
