import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { ArrowRight, Camera as CameraIcon } from 'react-native-feather';
import * as bip21 from 'bip21';

import Spinner from '../../reusable/Spinner';
import { breezGetFailedDeposits, breezRefundDeposit } from '../../../api/breez';
import { SwapInfo } from '@breeztech/react-native-breez-sdk';
import { isBtcAddress } from '../../../utils/parser';
import FailedDepositItem from './FailedDepositItem';
import Button from '../../reusable/Button';
import FeePicker from '../../shared/FeePicker';
import QrScanner from '../../reusable/QrScanner';
import { refundDeposit } from '../../../database/database';

interface Props {
  setError: (error: string) => void;
}

const FailedDeposits = ({ setError }: Props) => {
  const [failedDeposits, setFailedDeposits] = React.useState<SwapInfo[]>();
  const [refundAddress, setRefundAddress] = React.useState<string>('');
  const [fee, setFee] = React.useState<number | undefined>();
  const [formError, setFormError] = React.useState<string | undefined>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const [activeCamera, setActiveCamera] = React.useState<boolean>(false);

  const onScanQrCode = () => {
    setActiveCamera(true);
  };

  const onQrScanned = (value: string) => {
    // validate address and set value
    try {
      const decoded = bip21.decode(value);
      setRefundAddress(decoded.address);
      setActiveCamera(false);
    } catch (_) {
      console.error('found invalid BIP21');
    }
  };

  const onRefund = () => {
    if (!failedDeposits) {
      return;
    }
    if (!isBtcAddress(refundAddress)) {
      setFormError('Indirizzo BTC non valido');
      return;
    }
    if (!fee) {
      setFormError('Seleziona una fee');
      return;
    }

    for (const swap of failedDeposits) {
      breezRefundDeposit(refundAddress, swap, fee).then(() => {
        refundDeposit(swap)
          .then(() => {
            console.log('Refunded deposit', swap);
          })
          .catch(() => {
            console.error('Failed write refunded state to deposit', swap);
          });
      });
    }

    setFailedDeposits([]);
    setFormError(undefined);
  };

  React.useEffect(() => {
    if (failedDeposits === undefined) {
      breezGetFailedDeposits()
        .then(swaps => {
          setFailedDeposits(swaps);
        })
        .catch(() => {
          setError('Impossibile ottenere la lista dei depositi falliti');
        });
    } else if (failedDeposits.length === 0) {
      setLoading(false);
    }
  }, [failedDeposits]);

  if (loading) {
    return (
      <View className="flex flex-col items-center justify-center mx-auto w-full">
        <Spinner>
          <Text className="text-brandAlt w-full px-4 text-2xl text-center">
            Rimborso in corso{'\n'}Attendere, prego...
          </Text>
        </Spinner>
      </View>
    );
  }

  if (!failedDeposits || failedDeposits.length === 0) {
    return null;
  }

  return (
    <View className="flex flex-col mx-auto w-full py-4 px-2 pb-16">
      <QrScanner
        onClose={() => setActiveCamera(false)}
        visible={activeCamera}
        onQrCodeScanned={onQrScanned}
      />
      <Text className="text-xl">Depositi falliti</Text>
      <View>
        {failedDeposits.map((deposit, i) => (
          <FailedDepositItem key={i} swap={deposit} />
        ))}
      </View>
      <Text className="text-lg">
        Imposta un indirizzo BTC sul quale effettuare il rimborso
      </Text>
      <View className="mt-4 pr-4 flex flex-row items-center justify-center bg-gray-50 border border-gray-300 h-min">
        <TextInput
          className="text-text text-sm rounded-lg focus:ring-brand focus:border-brand p-4 focus-visible:outline-none w-4/6"
          placeholder="Indirizzo BTC"
          onChangeText={setRefundAddress}
          defaultValue={refundAddress}
        />
        <TouchableOpacity onPress={onScanQrCode}>
          <CameraIcon className="w-8 h-8 text-brandAlt" />
        </TouchableOpacity>
      </View>
      <View className="mt-4 pr-20 flex flex-row items-center justify-center bg-gray-50 border border-gray-300 h-min">
        <FeePicker
          className="w-full"
          fee={fee}
          onFeeChanged={setFee}
          onError={setError}
        />
      </View>
      <View className="flex flex-col justify-center items-center">
        {formError && <Text className="text-red-500">{formError}</Text>}
        <Button.Primary onPress={onRefund} disabled={loading}>
          <Text className="text-white text-2xl">Rimborsa depositi</Text>
          <ArrowRight className=" text-white" width={24} height={24} />
        </Button.Primary>
      </View>
    </View>
  );
};

export default FailedDeposits;
