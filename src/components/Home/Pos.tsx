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
import { error } from '../../utils/log';

interface Props {
  amount: Decimal;
  setAmount: (amount: Decimal) => void;
  onSubmitted: (amount: Decimal) => void;
}

const MINIMUM_AMOUNT_WITH_FEE = new Decimal(2500);

const Pos = ({ amount, setAmount, onSubmitted }: Props): JSX.Element => {
  const [cursor, setCursor] = React.useState(0);
  const [lnBalance, setLnBalance] = React.useState<Decimal>();
  const [eurTicker, setEurTicker] = React.useState<Decimal>();
  const [satsAmount, setSatsAmount] = React.useState<Decimal>();
  const [willPayFees, setWillPayFees] = React.useState<boolean>(false);

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
      setWillPayFees(satsAmount.greaterThan(lnBalance));
    }
  }, [satsAmount, lnBalance]);

  React.useEffect(() => {
    if (!lnBalance) {
      breezGetBalance()
        .then(balance => {
          setLnBalance(balance.lnBalance);
        })
        .catch(err => {
          error(err);
        });
    }

    if (!eurTicker) {
      getBTCEURTicker()
        .then(ticker => {
          setEurTicker(ticker);
        })
        .catch(err => {
          error(err);
        });
    }
  }, []);

  const submitDisabled =
    willPayFees && satsAmount?.lessThan(MINIMUM_AMOUNT_WITH_FEE);

  return (
    <View className="flex flex-col items-center justify-center w-full h-full bg-slate-100">
      {alertMessage(willPayFees, satsAmount)}
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
        <ActionButton disabled={submitDisabled} onClicked={onSubmit}>
          <Check
            className={`${submitDisabled ? 'text-brandAlt' : 'text-green-500'}`}
            width={32}
            height={32}
          />
        </ActionButton>
      </View>
      <View className="flex flex-row items-center justify-center">
        <Digit value={0} onDigitClicked={onDigitClicked} />
        <Digit value={0} text="00" onDigitClicked={onDoubleZeroClicked} />
      </View>
    </View>
  );
};

const alertMessage = (
  willPayFees: boolean,
  satsAmount: Decimal | undefined,
) => {
  if (!willPayFees || !satsAmount) {
    return null;
  }

  if (willPayFees && satsAmount.lessThan(MINIMUM_AMOUNT_WITH_FEE)) {
    return (
      <Alerts.Danger>
        <Text className="overflow-auto">
          Dal momento che devi pagare le commissioni per questa transazione,
          l&apos;importo minimo è di {MINIMUM_AMOUNT_WITH_FEE.toFixed(2)} Sats.
        </Text>
      </Alerts.Danger>
    );
  }

  return (
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
  );
};

export default Pos;
