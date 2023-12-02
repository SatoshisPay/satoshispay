import Decimal from 'decimal.js';
import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { ArrowRight, Camera as CameraIcon } from 'react-native-feather';

import { breezWithdrawSats } from '../../api/breez';
import { convertEURToSats, convertSatsToEUR } from '../../utils/conversion';
import Spinner from '../reusable/Spinner';
import { isBtcAddress } from '../../utils/parser';
import { insertWithdrawal } from '../../database/database';
import { WithdrawalStatus } from '../../data/withdrawal';
import Button from '../reusable/Button';
import FeePicker from '../shared/FeePicker';
import QrScanner from '../reusable/QrScanner';
import PinForm from '../reusable/PinForm';

interface Props {
  eurTicker?: Decimal;
  satsBalance: Decimal;
  setError: (error: string) => void;
  onWithdraw: () => void;
}

const WithdrawalForm = ({
  eurTicker,
  satsBalance,
  setError,
  onWithdraw,
}: Props) => {
  const [address, setAddress] = React.useState<string>(''); //bc1qvlmykjn7htz0vuprmjrlkwtv9m9pan6kylsr8w
  const [satsAmount, setSatsAmount] = React.useState<string>('');
  const [euroAmount, setEuroAmount] = React.useState<string>('');
  const [fee, setFee] = React.useState<number | undefined>();
  const [formError, setFormError] = React.useState<string>();
  const [activeCamera, setActiveCamera] = React.useState<boolean>(false);
  const [inProgress, setInProgress] = React.useState(false);
  const [showPin, setShowPin] = React.useState<boolean>(false);

  const onScanQrCode = () => {
    setActiveCamera(true);
  };

  const onQrScanned = (value: string) => {
    // validate address and set value
    if (isBtcAddress(value)) {
      setAddress(value);
      setActiveCamera(false);
    }
  };

  const validateAll = (): Decimal | undefined => {
    let amountNumber: Decimal;
    try {
      amountNumber = new Decimal(satsAmount);
    } catch (e) {
      setFormError('Importo non valido');
      return undefined;
    }
    if (amountNumber.isZero() || amountNumber.isNegative()) {
      setFormError("L'importo deve essere maggiore di 0");
      return undefined;
    }
    if (amountNumber.greaterThan(satsBalance)) {
      setFormError('Non hai abbastanza satoshi');
      return undefined;
    }
    if (!isBtcAddress(address)) {
      setFormError('Indirizzo non valido');
      return undefined;
    }
    if (fee === undefined) {
      setFormError('Devi selezionare una fee per il prelievo');
      return undefined;
    }

    return amountNumber;
  };

  const onSubmit = () => {
    setShowPin(true);
    const amountNumber: Decimal | undefined = validateAll();

    if (amountNumber === undefined) {
      return;
    }
  };

  const onValidPin = () => {
    onWithdrawCb();
  };

  const onWithdrawCb = () => {
    const amountNumber: Decimal | undefined = validateAll();

    if (amountNumber === undefined || fee === undefined) {
      return;
    }
    setFormError(undefined);

    setInProgress(true);
    const fiatAmount = eurTicker
      ? convertSatsToEUR(eurTicker, amountNumber)
      : new Decimal(0);

    breezWithdrawSats(amountNumber, address, fee)
      .then(id => {
        onWithdraw();
        setInProgress(false);
        setAddress('');
        setSatsAmount('');
        insertWithdrawal({
          id,
          recipient: address,
          fiatAmount,
          satsAmount: amountNumber,
          status: WithdrawalStatus.IN_PROGRESS,
          insertedAt: new Date(),
        })
          .then(() => {
            console.log('Withdrawal inserted');
          })
          .catch(e => {
            console.error(e);
            setError('Impossibile inserire il prelievo nel database');
          });
      })
      .catch(e => {
        console.error(e);
        setError(e.message);
        setInProgress(false);
      });
  };

  const onSatsAmountChanged = (amount: string) => {
    setSatsAmount(amount);
    try {
      const amountNumber = new Decimal(amount);
      if (eurTicker) {
        setEuroAmount(convertSatsToEUR(eurTicker, amountNumber).toFixed(2));
      }
    } catch (e) {
      return;
    }
  };

  const onEurAmountChanged = (amount: string) => {
    setEuroAmount(amount);
    try {
      const amountNumber = new Decimal(amount);
      if (eurTicker) {
        setSatsAmount(convertEURToSats(eurTicker, amountNumber).toFixed(0));
      }
    } catch (e) {
      return;
    }
  };

  React.useEffect(() => {
    if (eurTicker) {
      try {
        const amountNumber = new Decimal(satsAmount);
        if (eurTicker) {
          setEuroAmount(convertSatsToEUR(eurTicker, amountNumber).toFixed(2));
        }
      } catch (e) {}
    }
  }, [eurTicker]);

  const buttonDisabled = inProgress || !address || !satsAmount;

  if (inProgress) {
    return (
      <View className="flex flex-col items-center justify-center mx-auto w-full">
        <Spinner bgColor="bg-transparent">
          <Text className="text-brandAlt w-full px-4 text-2xl text-center">
            Prelievo in corso{'\n'}Attendere, prego...
          </Text>
        </Spinner>
      </View>
    );
  }

  return (
    <View className="flex flex-col items-center justify-center mx-auto w-full">
      <PinForm
        onClose={() => setShowPin(false)}
        onValidPin={onValidPin}
        visibile={showPin}
      />
      <QrScanner
        onClose={() => setActiveCamera(false)}
        visible={activeCamera}
        onQrCodeScanned={onQrScanned}
      />
      <Text className="text-3xl text-brandAlt">Prelievo</Text>
      <View className="mt-4 pr-4 flex flex-row items-center justify-center bg-gray-50 border border-gray-300 h-min">
        <TextInput
          className="text-text text-sm rounded-lg focus:ring-brand focus:border-brand p-4 focus-visible:outline-none w-4/6"
          placeholder="Indirizzo BTC"
          onChangeText={setAddress}
          defaultValue={address}
        />
        <TouchableOpacity onPress={onScanQrCode}>
          <CameraIcon className="w-8 h-8 text-brandAlt" />
        </TouchableOpacity>
      </View>
      <View className="mt-4 pr-20 flex flex-row items-center justify-center bg-gray-50 border border-gray-300 h-min">
        <TextInput
          className="text-text text-sm rounded-lg focus:ring-brand focus:border-brand p-4 focus-visible:outline-none w-4/6"
          placeholder="Importo in Satoshi"
          onChangeText={onSatsAmountChanged}
          defaultValue={satsAmount}
          inputMode="numeric"
        />
      </View>
      <View className="mt-4 pr-20 flex flex-row items-center justify-center bg-gray-50 border border-gray-300 h-min">
        <TextInput
          className="text-text text-sm rounded-lg focus:ring-brand focus:border-brand p-4 focus-visible:outline-none w-4/6"
          placeholder="Importo in Euro"
          onChangeText={onEurAmountChanged}
          defaultValue={euroAmount}
          inputMode="numeric"
        />
      </View>
      <View className="mt-4 flex flex-row items-center justify-center h-[55px] w-full">
        <View className="left-0 right-0 mx-auto border-gray-300 border bg-gray-50 h-full w-4/6">
          <FeePicker
            className="text-text"
            fee={fee}
            onFeeChanged={setFee}
            onError={setError}
          />
        </View>
      </View>
      <View className="flex flex-col justify-center items-center">
        {formError && <Text className="text-red-500">{formError}</Text>}
        <Button.Primary onPress={onSubmit} disabled={buttonDisabled}>
          <Text className="text-white text-2xl">Preleva</Text>
          <ArrowRight className=" text-white" width={24} height={24} />
        </Button.Primary>
      </View>
    </View>
  );
};

export default WithdrawalForm;
