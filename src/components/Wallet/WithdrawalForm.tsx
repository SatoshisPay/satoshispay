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
import { breezWithdrawSats } from '../../api/breez';
import { convertEURToSats, convertSatsToEUR } from '../../utils/conversion';
import Spinner from '../reusable/Spinner';
import { isBtcAddress } from '../../utils/parser';

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
  const [formError, setFormError] = React.useState<string>();
  const { hasPermission, requestPermission } = useCameraPermission();
  const [activeCamera, setActiveCamera] = React.useState<boolean>(false);
  const [inProgress, setInProgress] = React.useState(false);

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

  const onWithdrawCb = () => {
    let amountNumber;
    try {
      amountNumber = new Decimal(satsAmount);
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
    if (!isBtcAddress(address)) {
      setFormError('Indirizzo non valido');
    }
    setInProgress(true);
    breezWithdrawSats(amountNumber, address)
      .then(() => {
        onWithdraw();
        setInProgress(false);
        setAddress('');
        setSatsAmount('');
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
        <Spinner>
          <Text className="text-brandAlt w-full px-4 text-2xl text-center">
            Prelievo in corso{'\n'}Attendere, prego...
          </Text>
        </Spinner>
      </View>
    );
  }

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
      <View className="flex flex-col justify-center items-center">
        {formError && <Text className="text-red-500">{formError}</Text>}
        <TouchableOpacity
          className={`${
            buttonDisabled ? 'bg-brandAlt' : 'bg-brand'
          } flex-row items-center justify-center rounded-lg p-4 mt-4 shadow-lg border border-gray-300`}
          onPress={onWithdrawCb}
          disabled={buttonDisabled}>
          <Text className="text-white text-2xl">Preleva</Text>
          <ArrowRight className=" text-white" width={24} height={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WithdrawalForm;
