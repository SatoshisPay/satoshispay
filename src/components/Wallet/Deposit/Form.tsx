import React from 'react';
import { View, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { ArrowRight, Check, Copy } from 'react-native-feather';
import Clipboard from '@react-native-clipboard/clipboard';
import Decimal from 'decimal.js';
import uuid from 'react-native-uuid';

import Deposit, { DepositStatus } from '../../../data/deposit';
import Spinner from '../../reusable/Spinner';
import { breezGetDepositAddress } from '../../../api/breez';
import Button from '../../reusable/Button';
import { SwapInfo } from '@breeztech/react-native-breez-sdk';
import { encodeBIP21 } from '../../../utils/encode';
import {
  convertBTCToEUR,
  convertBTCtoSats,
  convertEURToSats,
  convertSatsToBTC,
  convertSatsToEUR,
} from '../../../utils/conversion';
import { insertDeposit } from '../../../database/database';
import { privateKeyToWIF } from '../../../utils/bitcoin';
import { encryptSecret } from '../../../database/keystore';
import Input from '../../reusable/Input';
import { error } from '../../../utils/log';

interface Props {
  eurTicker?: Decimal;
  onDeposit: () => void;
  setError: (error: string) => void;
}

const Form = ({ eurTicker, onDeposit, setError }: Props) => {
  const [swapInfo, setSwapInfo] = React.useState<SwapInfo | undefined>();
  const [depositBtcAmount, setDepositBtcAmount] = React.useState<
    Decimal | undefined
  >();
  const [depositSatsAmount, setDepositSatsAmount] = React.useState<string>();
  const [depositEuroAmount, setDepositEuroAmount] = React.useState<string>();
  const [showQr, setShowQr] = React.useState(false);

  const copyAddress = () => {
    if (swapInfo) {
      Clipboard.setString(swapInfo.bitcoinAddress);
    }
  };

  const onSatsAmountChange = (amount: string) => {
    setDepositSatsAmount(amount);
    try {
      const amountNumber = new Decimal(amount);
      if (eurTicker) {
        setDepositEuroAmount(
          convertSatsToEUR(eurTicker, amountNumber).toFixed(2),
        );
      }
    } catch (e) {
      return;
    }
  };

  const onEurAmountChanged = (amount: string) => {
    setDepositEuroAmount(amount);
    try {
      const amountNumber = new Decimal(amount);
      if (eurTicker) {
        setDepositSatsAmount(
          convertEURToSats(eurTicker, amountNumber).toFixed(0),
        );
      }
    } catch (e) {
      return;
    }
  };

  const onDepositConfirmed = () => {
    if (!depositBtcAmount || !swapInfo) {
      return;
    }

    const satsAmount = convertBTCtoSats(depositBtcAmount);

    if (depositBtcAmount.isZero() || depositBtcAmount.isNegative()) {
      setError("L'importo deve essere maggiore di 0");
      return;
    }
    if (satsAmount.lessThan(swapInfo.minAllowedDeposit)) {
      setError(`L'importo minimo è ${swapInfo.minAllowedDeposit} BTC`);
      return;
    }
    if (satsAmount.greaterThan(swapInfo.maxAllowedDeposit)) {
      setError(`L'importo massimo è ${swapInfo.maxAllowedDeposit} BTC`);
      return;
    }

    insertDepositIntoDatabase(depositBtcAmount, swapInfo, eurTicker)
      .then(() => {
        setDepositSatsAmount(undefined);
        setDepositEuroAmount(undefined);
        setSwapInfo(undefined);
        setShowQr(false);
        onDeposit();
      })
      .catch(e => {
        error(e.message);
        setError('Impossibile inserire il deposito nel database');
      });
  };

  React.useEffect(() => {
    if (!swapInfo) {
      breezGetDepositAddress()
        .then(swap => {
          setSwapInfo(swap);
        })
        .catch(() => {
          setError('Impossibile generare un indirizzo di deposito');
        });
    } else {
      setDepositSatsAmount(swapInfo.minAllowedDeposit.toString());
      if (eurTicker) {
        setDepositEuroAmount(
          convertSatsToEUR(
            eurTicker,
            new Decimal(swapInfo.minAllowedDeposit),
          ).toFixed(2),
        );
      }
    }
  }, [swapInfo]);

  React.useEffect(() => {
    try {
      if (depositSatsAmount) {
        const dec = new Decimal(depositSatsAmount);
        setDepositBtcAmount(convertSatsToBTC(dec));
      }
    } catch (_) {}
  }, [depositSatsAmount]);

  if (!swapInfo) {
    return (
      <View className="flex flex-col items-center justify-center mx-auto w-full">
        <Spinner bgColor="bg-transparent">
          <Text className="text-brandAlt w-full px-4 text-2xl text-center">
            Generazione indirizzo in corso{'\n'}Attendere, prego...
          </Text>
        </Spinner>
      </View>
    );
  }

  const buttonDisabled = !depositBtcAmount || depositBtcAmount.isZero();

  return (
    <View className="flex flex-col items-center justify-center mx-auto w-min">
      <Text className="text-3xl text-brandAlt pb-4">Deposito</Text>
      {showQr ? (
        <>
          <Text className="text-xl text-brandAlt pb-4">
            Invia i tuoi BTC a questo indirizzo
          </Text>
          <QRCode
            value={encodeBIP21(swapInfo.bitcoinAddress, depositBtcAmount)}
            size={256}
            color="#202020"
            backgroundColor="#ffffff"
          />
          <View className="flex flex-row items-center mt-2">
            <View className="mr-4">
              <Text className="text-xs pt-2">
                {swapInfo.bitcoinAddress.substring(0, 30)}
              </Text>
              <Text className="text-xs">
                {swapInfo.bitcoinAddress.substring(30)}
              </Text>
            </View>
            <View>
              <Button.Secondary onPress={copyAddress}>
                <Copy className="h-[24px] w-[24px] text-brandAlt" />
              </Button.Secondary>
            </View>
          </View>
          <View className="flex flex-col justify-center items-center pb-8">
            <Button.Primary onPress={onDepositConfirmed}>
              <Text className="text-white text-2xl">Ho inviato i Bitcoin</Text>
              <Check className=" text-white" width={24} height={24} />
            </Button.Primary>
          </View>
        </>
      ) : (
        <>
          <Input
            label="Importo in Sats"
            placeholder="Importo in Sats"
            value={depositSatsAmount}
            onChangeText={onSatsAmountChange}
            keyboardType="numeric"
          />
          <Input
            label="Importo in Euro"
            placeholder="Importo in Euro"
            value={depositEuroAmount}
            onChangeText={onEurAmountChanged}
            keyboardType="numeric"
          />
          <View className="flex flex-col justify-center items-center pb-8">
            <Button.Primary
              onPress={() => setShowQr(true)}
              disabled={buttonDisabled}>
              <Text className="text-white text-2xl">Genera QR</Text>
              <ArrowRight className=" text-white" width={24} height={24} />
            </Button.Primary>
          </View>
        </>
      )}
    </View>
  );
};

const insertDepositIntoDatabase = async (
  depositBtcAmount: Decimal,
  swapInfo: SwapInfo,
  eurTicker: Decimal | undefined,
) => {
  const fiatAmount = eurTicker
    ? convertBTCToEUR(eurTicker, depositBtcAmount)
    : new Decimal(0);

  const privateKey = privateKeyToWIF(swapInfo.privateKey);
  // encrypt private key
  const encryptedPrivateKey = await encryptSecret(privateKey);

  // check amount
  const deposit: Deposit = {
    id: uuid.v4().toString(),
    address: swapInfo.bitcoinAddress,
    privateKey: encryptedPrivateKey,
    satsAmount: convertBTCtoSats(depositBtcAmount),
    fiatAmount,
    status: DepositStatus.IN_PROGRESS,
    insertedAt: new Date(),
  };

  return await insertDeposit(deposit);
};

export default Form;
