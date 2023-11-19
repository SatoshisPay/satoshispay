import React from 'react';
import { Text, View, TextInput } from 'react-native';
import Button from '../reusable/Button';
import { ArrowRight } from 'react-native-feather';

interface Props {
  onPinConfirm: (pin: string) => void;
  processing: boolean;
}

const PinForm = ({ onPinConfirm, processing }: Props) => {
  const [pin, setPin] = React.useState<string>('');
  const [confirmPin, setConfirmPin] = React.useState<string>('');

  const isDisabled = processing || pin !== confirmPin || pin.length !== 6;

  return (
    <View className="w-full flex flex-col items-center justify-center pt-8 px-4">
      <Text className="text-2xl text-center">
        Inserisci un PIN{'\n'}per effettuare i prelievi
      </Text>
      <Text className="text-center pt-4">
        Inserisci un pin segreto di 6 cifre, che ti servirà per effettuare i
        prelievi dal tuo wallet. Non dimenticarlo o non sarai più in grado di
        prelevere i tuoi fondi.
      </Text>
      <View className="w-full flex flex-col items-center justify-center">
        <View className="flex flex-col items-center justify-between w-full py-4">
          <Text className="text-center text-2xl">PIN</Text>
          <TextInput
            inputMode="numeric"
            keyboardType="numeric"
            secureTextEntry={true}
            maxLength={6}
            className="w-3/4 text-4xl text-center py-4 mt-4 bg-white border border-gray-200 rounded-xl shadow-xl"
            value={pin}
            onChangeText={text => setPin(text)}
          />
        </View>
        <View className="flex flex-col items-center justify-between w-full py-4">
          <Text className="text-center text-2xl">Conferma PIN</Text>
          <TextInput
            inputMode="numeric"
            keyboardType="numeric"
            secureTextEntry={true}
            maxLength={6}
            className="w-3/4 text-4xl text-center py-4 mt-4 bg-white border border-gray-200 rounded-xl shadow-xl"
            value={confirmPin}
            onChangeText={text => setConfirmPin(text)}
          />
        </View>
        <View className="flex flex-col items-center justify-center">
          {pin !== confirmPin && (
            <Text className="text-center text-red-500">
              I PIN non corrispondono
            </Text>
          )}
          {pin !== '' && pin.length !== 6 && (
            <Text className="text-center text-red-500">
              Il PIN deve essere di 6 cifre
            </Text>
          )}
          {!isDisabled && (
            <Button.Primary
              onPress={() => onPinConfirm(pin)}
              disabled={isDisabled}>
              <Text className="text-white text-center text-2xl">
                Conferma PIN
              </Text>
              <ArrowRight className="ml-2 text-white" />
            </Button.Primary>
          )}
        </View>
      </View>
    </View>
  );
};

export default PinForm;
