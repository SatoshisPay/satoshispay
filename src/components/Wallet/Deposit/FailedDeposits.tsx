import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
} from 'react-native';
import {
  Camera,
  Code,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import { ArrowRight, Camera as CameraIcon } from 'react-native-feather';

import Spinner from '../../reusable/Spinner';
import { breezGetFailedDeposits, breezRefundDeposit } from '../../../api/breez';
import { SwapInfo } from '@breeztech/react-native-breez-sdk';
import { isBtcAddress } from '../../../utils/parser';
import FailedDepositItem from './FailedDepositItem';

interface Props {
  setError: (error: string) => void;
}

const FailedDeposits = ({ setError }: Props) => {
  const [failedDeposits, setFailedDeposits] = React.useState<SwapInfo[]>();
  const [refundAddress, setRefundAddress] = React.useState<string>('');
  const [formError, setFormError] = React.useState<string | undefined>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const { hasPermission, requestPermission } = useCameraPermission();
  const [activeCamera, setActiveCamera] = React.useState<boolean>(false);
  const cameraDevice = useCameraDevice('back');

  const onScanQrCode = () => {
    if (!hasPermission) {
      requestPermission().then(permission => {
        if (permission && cameraDevice) {
          setActiveCamera(true);
        }
      });
    }
  };

  const onQrScanned = (codes: Code[]) => {
    for (const code of codes) {
      if (code.type === 'qr' && code.value) {
        setRefundAddress(code.value);
      }
    }
    setActiveCamera(false);
  };

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: onQrScanned,
  });

  const onRefund = () => {
    if (!failedDeposits) {
      return;
    }
    if (!isBtcAddress(refundAddress)) {
      setFormError('Indirizzo BTC non valido');
      return;
    }
    for (const swap of failedDeposits) {
      breezRefundDeposit(refundAddress, swap).then(() => {
        setFormError(undefined);
        setFailedDeposits(
          failedDeposits?.filter(s => s.paymentHash !== swap.paymentHash),
        );
      });
    }
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
      {cameraDevice && (
        <Modal visible={activeCamera} animationType="slide">
          <Camera
            codeScanner={codeScanner}
            style={StyleSheet.absoluteFill}
            device={cameraDevice}
            isActive={activeCamera}
          />
        </Modal>
      )}
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
      <View className="flex flex-col justify-center items-center">
        {formError && <Text className="text-red-500">{formError}</Text>}
        <TouchableOpacity
          className={`${
            loading ? 'bg-brandAlt' : 'bg-brand'
          } flex-row items-center justify-center rounded-lg p-4 mt-4 shadow-lg border border-gray-300`}
          onPress={onRefund}
          disabled={loading}>
          <Text className="text-white text-2xl">Rimborsa depositi</Text>
          <ArrowRight className=" text-white" width={24} height={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FailedDeposits;
