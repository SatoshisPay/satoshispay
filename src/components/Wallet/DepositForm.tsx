import React from 'react';
import { View, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Copy } from 'react-native-feather';
import Clipboard from '@react-native-clipboard/clipboard';

import Spinner from '../reusable/Spinner';
import { breezGetDepositAddress } from '../../api/breez';
import FailedDeposits from './Deposit/FailedDeposits';
import Button from '../reusable/Button';

interface Props {
  setError: (error: string) => void;
}

const DepositForm = ({ setError }: Props) => {
  const [btcAddress, setBtcAddress] = React.useState<string>();

  const copyAddress = () => {
    if (btcAddress) {
      Clipboard.setString(btcAddress);
    }
  };

  React.useEffect(() => {
    if (!btcAddress) {
      breezGetDepositAddress()
        .then(address => {
          setBtcAddress(address);
        })
        .catch(() => {
          setError('Impossibile generare un indirizzo di deposito');
        });
    }
  }, [btcAddress]);

  if (!btcAddress) {
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

  return (
    <View className="flex flex-col items-center justify-center mx-auto w-min">
      <Text className="text-3xl text-brandAlt pb-4">Deposito</Text>
      <Text className="text-xl text-brandAlt pb-4">
        Invia i tuoi BTC a questo indirizzo
      </Text>
      <QRCode
        value={btcAddress}
        size={256}
        color="#202020"
        backgroundColor="#ffffff"
      />
      <View className="flex flex-row items-center mt-2">
        <View className="mr-4">
          <Text className="text-xs pt-2">{btcAddress.substring(0, 30)}</Text>
          <Text className="text-xs">{btcAddress.substring(30)}</Text>
        </View>
        <View>
          <Button.Secondary onPress={copyAddress}>
            <Copy className="h-[24px] w-[24px] text-brandAlt" />
          </Button.Secondary>
        </View>
      </View>
      <FailedDeposits setError={setError} />
    </View>
  );
};

export default DepositForm;
