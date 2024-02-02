import Decimal from 'decimal.js';
import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { ArrowRight, Camera as CameraIcon } from 'react-native-feather';

import {
  breezGetWithdrawLimits,
  breezSendPayment,
  breezWithdrawSats,
} from '../../api/breez';
import {
  convertBTCtoSats,
  convertEURToSats,
  convertSatsToEUR,
} from '../../utils/conversion';
import Spinner from '../reusable/Spinner';
import {
  isBolt11,
  isBtcAddress,
  parseBitcoinQRCode,
  parseBolt11Amount,
} from '../../utils/parser';
import { insertWithdrawal } from '../../database/database';
import { WithdrawalStatus } from '../../data/withdrawal';
import Button from '../reusable/Button';
import FeePicker from '../shared/FeePicker';
import QrScanner from '../reusable/QrScanner';
import PinForm from '../reusable/PinForm';
import NetworkPicker from './Withdrawal/NetworkPicker';
import Input from '../reusable/Input';
import { error } from '../../utils/log';

interface Props {
  eurTicker?: Decimal;
  satsBalance: Decimal;
  setError: (error: string) => void;
  onWithdraw: () => void;
}

export enum Network {
  BTC = 'btc',
  LN = 'ln',
}

const WithdrawalForm = ({
  eurTicker,
  satsBalance,
  setError,
  onWithdraw,
}: Props) => {
  const [network, setNetwork] = React.useState<Network>(Network.LN); // ['btc', 'ln']
  const [recipient, setRecipient] = React.useState<string>(''); // address or invoice
  const [satsAmount, setSatsAmount] = React.useState<string>('');
  const [euroAmount, setEuroAmount] = React.useState<string>('');
  const [fee, setFee] = React.useState<number | undefined>();
  const [limits, setLimits] = React.useState<{ min: Decimal; max: Decimal }>();

  const [formError, setFormError] = React.useState<string>();
  const [activeCamera, setActiveCamera] = React.useState<boolean>(false);
  const [inProgress, setInProgress] = React.useState(false);
  const [showPin, setShowPin] = React.useState<boolean>(false);

  const onScanQrCode = () => {
    setActiveCamera(true);
  };

  const onQrScanned = (value: string) => {
    // try to parse bolt11
    if (isBolt11(value)) {
      setRecipient(value);
      setNetwork(Network.LN);
      setActiveCamera(false);
    } else {
      // try with bitcoin
      // validate address and set value
      parseBitcoinQRCode(value)
        .then(({ address, amount }) => {
          setRecipient(address);
          setNetwork(Network.BTC);
          if (amount) {
            setSatsAmount(convertBTCtoSats(amount).toFixed(0));
          }
          setActiveCamera(false);
        })
        .catch(() => {
          error('found invalid BIP21');
        });
    }
  };

  const validateAllBtc = (): boolean => {
    const amountNumber = new Decimal(satsAmount);
    if (!isBtcAddress(recipient)) {
      setFormError('Indirizzo non valido');
      return false;
    }
    if (fee === undefined) {
      setFormError('Devi selezionare una fee per il prelievo');
      return false;
    }
    if (limits && amountNumber.greaterThan(limits.max)) {
      setFormError(`L'importo massimo è ${limits.max.toFixed(0)} satoshi`);
      return false;
    }
    if (limits && amountNumber.lessThanOrEqualTo(limits.min)) {
      setFormError(`L'importo minimo è ${limits.min.toFixed(0)} satoshi`);
      return false;
    }

    return true;
  };

  const validateAllLn = (satoshiAmount: Decimal): boolean => {
    if (!isBolt11(recipient)) {
      setFormError('Invoice non valido');
      return false;
    }
    // validate invoice amount
    const invoiceAmount = parseBolt11Amount(recipient);
    if (invoiceAmount && !invoiceAmount.eq(satoshiAmount)) {
      setFormError("L'importo dell'invoice non corrisponde");
      return false;
    }

    return true;
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

    if (network === Network.BTC && !validateAllBtc()) {
      return undefined;
    }
    if (network === Network.LN && !validateAllLn(amountNumber)) {
      return undefined;
    }

    return amountNumber;
  };

  const onSubmit = () => {
    const amountNumber: Decimal | undefined = validateAll();

    if (amountNumber === undefined) {
      return;
    } else {
      setShowPin(true);
    }
  };

  const onValidPin = () => {
    setShowPin(false);
    onWithdrawCb();
  };

  const onWithdrawSuccess = (
    id: string,
    fiatAmount: Decimal,
    satoshiAmount: Decimal,
  ) => {
    onWithdraw();
    setInProgress(false);
    setRecipient('');
    setSatsAmount('');
    insertWithdrawal({
      id,
      recipient: recipient,
      fiatAmount,
      satsAmount: satoshiAmount,
      status: WithdrawalStatus.IN_PROGRESS,
      insertedAt: new Date(),
    })
      .then(() => {
        error('Withdrawal inserted');
      })
      .catch(e => {
        error(e);
        setError('Impossibile inserire il prelievo nel database');
      });
  };

  const withdrawToBtcNetwork = (
    amountNumber: Decimal,
    address: string,
    selectedFee: number,
    fiatAmount: Decimal,
  ) => {
    breezWithdrawSats(amountNumber, address, selectedFee)
      .then(id => {
        onWithdrawSuccess(id, fiatAmount, amountNumber);
      })
      .catch(e => {
        error(e);
        setError(e.message);
        setInProgress(false);
      });
  };

  const withdrawToLnNetwork = (
    amountNumber: Decimal,
    bolt11: string,
    fiatAmount: Decimal,
  ) => {
    const invoiceAmount = parseBolt11Amount(bolt11);
    const paymentAmount = invoiceAmount ? undefined : amountNumber;
    breezSendPayment(bolt11, paymentAmount)
      .then(id => {
        onWithdrawSuccess(id, fiatAmount, amountNumber);
      })
      .catch(e => {
        error(e);
        setError(e.message);
        setInProgress(false);
      });
  };

  const onWithdrawCb = () => {
    const amountNumber: Decimal | undefined = validateAll();

    if (amountNumber === undefined) {
      return;
    }
    setFormError(undefined);

    setInProgress(true);
    const fiatAmount = eurTicker
      ? convertSatsToEUR(eurTicker, amountNumber)
      : new Decimal(0);

    if (network === Network.BTC && fee !== undefined) {
      withdrawToBtcNetwork(amountNumber, recipient, fee, fiatAmount);
    } else if (network === Network.LN) {
      withdrawToLnNetwork(amountNumber, recipient, fiatAmount);
    } else {
      setInProgress(false);
      setFormError('Errore nel prelievo. Riprova più tardi');
    }
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

  React.useEffect(() => {
    if (recipient.length > 0 && network === Network.LN) {
      // set amount to invoice amount
      try {
        const invoiceAmount = parseBolt11Amount(recipient);
        if (invoiceAmount) {
          setSatsAmount(invoiceAmount.toFixed(0));
        }
      } catch (e) {}
    }
  }, [network, recipient]);

  React.useEffect(() => {
    if (satsAmount) {
      // set fiat amount
      if ((euroAmount === '' || euroAmount === '0') && eurTicker) {
        setEuroAmount(
          convertSatsToEUR(eurTicker, new Decimal(satsAmount)).toFixed(2),
        );
      }

      const amountNumber = new Decimal(satsAmount);
      breezGetWithdrawLimits(amountNumber)
        .then(wLimits => {
          setLimits(wLimits);
        })
        .catch(e => {
          setLimits({
            max: new Decimal(500_000_000_000),
            min: new Decimal(50_000),
          });
          error(e);
        });
    }
  }, [satsAmount]);

  const buttonDisabled = inProgress || !recipient || !satsAmount;

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
      <Text className="text-3xl text-brandAlt">Invia Bitcoin</Text>
      <View className="mt-4 w-page">
        <Text className=" text-text py-1 text-lg">Seleziona rete</Text>
        <View className="flex flex-row items-center justify-center h-[55px] w-full">
          <View className="left-0 right-0 mx-auto border-gray-300 border bg-gray-50 h-full w-full">
            <NetworkPicker
              className="text-text"
              network={network}
              onChange={setNetwork}
            />
          </View>
        </View>
      </View>
      <View className="mt-4 w-page">
        <Text className=" text-text py-1 text-lg">
          {network === Network.BTC ? 'Indirizzo BTC' : 'Invoice LN'}
        </Text>
        <View className="w-full flex flex-row items-center bg-gray-50 border border-gray-300 h-min relative">
          <TextInput
            className="text-text text-sm rounded-lg focus:ring-brand focus:border-brand p-4 focus-visible:outline-none w-5/6 mr-[20px]"
            placeholder={network === Network.BTC ? 'bc1...' : 'lnbc...'}
            onChangeText={setRecipient}
            defaultValue={recipient}
          />
          <TouchableOpacity
            onPress={onScanQrCode}
            className="right-2 top-4 bottom-0 absolute">
            <CameraIcon className="w-8 h-8 text-brandAlt" />
          </TouchableOpacity>
        </View>
      </View>
      <Input
        placeholder="0"
        label="Importo in Satoshi"
        onChangeText={onSatsAmountChanged}
        value={satsAmount}
        keyboardType="numeric"
      />
      <Input
        placeholder="0"
        label="Importo in Euro"
        onChangeText={onEurAmountChanged}
        value={euroAmount}
        keyboardType="numeric"
      />
      {network === Network.BTC && (
        <View className="mt-4 w-page">
          <Text className=" text-text py-1 text-lg">Seleziona fee</Text>
          <View className="flex flex-row items-center justify-center h-[55px] w-full">
            <View className="left-0 right-0 mx-auto border-gray-300 border bg-gray-50 h-full w-full">
              <FeePicker
                className="text-text"
                fee={fee}
                onFeeChanged={setFee}
                onError={setError}
              />
            </View>
          </View>
        </View>
      )}
      <View className="flex flex-col justify-center items-center pb-8">
        {formError && <Text className="text-red-500">{formError}</Text>}
        <Button.Primary onPress={onSubmit} disabled={buttonDisabled}>
          <Text className="text-white text-2xl">Invia</Text>
          <ArrowRight className=" text-white" width={24} height={24} />
        </Button.Primary>
      </View>
    </View>
  );
};

export default WithdrawalForm;
