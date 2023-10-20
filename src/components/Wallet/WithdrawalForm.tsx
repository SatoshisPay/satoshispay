import Decimal from 'decimal.js';
import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import { ArrowRight, Camera as CameraIcon } from 'react-native-feather';
import {
  Camera,
  Code,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';

interface Props {
  satsBalance: Decimal;
  setError: (error: string) => void;
}

const WithdrawalForm = ({ satsBalance, setError }: Props) => {
  const [address, setAddress] = React.useState<string>('');
  const [amount, setAmount] = React.useState<string>('');
  const [formError, setFormError] = React.useState<string>();
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
        setAddress(code.value);
      }
    }
    setActiveCamera(false);
  };

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: onQrScanned,
  });

  const onWithdraw = () => {
    let amountNumber;
    try {
      amountNumber = new Decimal(amount);
    } catch (e) {
      setFormError('Importo non valido');
      return;
    }
    if (amountNumber.isZero() || amountNumber.isNegative()) {
      setFormError("L'importo deve essere maggiore di 0");
    }
    if (amountNumber.greaterThan(satsBalance)) {
      setFormError('Non hai abbastanza satoshi');
    }
    if (!address.match(/^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/)) {
      setFormError('Indirizzo non valido');
    }
    // TODO: withdraw
  };

  return (
    <View className="flex flex-col items-center justify-center mx-auto w-full">
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
          onChangeText={setAmount}
          defaultValue={amount}
          inputMode="numeric"
        />
      </View>
      <View className="flex flex-col justify-center items-center">
        {formError && <Text className="text-red-500">{formError}</Text>}
        <TouchableOpacity
          className="bg-brand flex-row items-center justify-center rounded-lg p-4 mt-4 shadow-lg border border-gray-300"
          onPress={onWithdraw}>
          <Text className="text-white text-2xl">Preleva</Text>
          <ArrowRight className=" text-white" width={24} height={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WithdrawalForm;
