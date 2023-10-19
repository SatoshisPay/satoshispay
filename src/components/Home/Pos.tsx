import Decimal from 'decimal.js';
import React from 'react';
import { View } from 'react-native';
import Balance from './Pos/Balance';
import Digit from './Pos/Digit';
import ActionButton from './Pos/ActionButton';
import { ArrowLeft, Check, X } from 'react-native-feather';

interface Props {
  onSubmitted: (amount: Decimal) => void;
}

const Pos = (props: Props): JSX.Element => {
  const [amount, setAmount] = React.useState(new Decimal(0));
  const [cursor, setCursor] = React.useState(0);

  const onDigitClicked = (digit: number) => {
    const newAmount = amount.mul(10).plus(digit / 100);
    setAmount(newAmount);
    setCursor(cursor + 1);
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

    props.onSubmitted(amount);
  };

  return (
    <View className="flex flex-col items-center justify-center w-full bg-slate-100">
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
      </View>
    </View>
  );
};

export default Pos;
