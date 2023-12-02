import React from 'react';
import { TextInput, Text, View, Modal } from 'react-native';
import { ArrowRight } from 'react-native-feather';

import Button from './Button';
import Alerts from './Alerts';
import { verifyPin } from '../../database/keystore';

interface Props {
  onClose: () => void;
  onValidPin: () => void;
  visibile: boolean;
}

const PinForm = ({ onClose, onValidPin, visibile }: Props) => {
  const [pin, setPin] = React.useState<string>('');
  const [formError, setFormError] = React.useState<string>();

  const disabled = pin.length < 6;

  const onSubmit = () => {
    verifyPin(pin)
      .then(pinMatches => {
        if (pinMatches) {
          setPin('');
          setFormError(undefined);
          onValidPin();
        } else {
          setFormError('PIN non corretto');
        }
      })
      .catch(e => {
        console.error(e);
        setFormError('Impossibile verificare il PIN');
      });
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visibile}
      onRequestClose={onClose}>
      <View className="flex flex-col items-center justify-between w-full py-4">
        <Text className="text-center text-2xl">
          Inserisci il tuo PIN segreto per confermare il prelievo
        </Text>
        <TextInput
          inputMode="numeric"
          keyboardType="numeric"
          secureTextEntry={true}
          maxLength={6}
          className="w-3/4 text-4xl text-center py-4 mt-4 bg-white border border-gray-200 rounded-xl shadow-xl"
          value={pin}
          onChangeText={text => setPin(text)}
        />
        {formError && (
          <Alerts.Danger>
            <Text className="text-red-700 text-lg text-center">
              {formError}
            </Text>
          </Alerts.Danger>
        )}
        <Button.Primary disabled={disabled} onPress={onSubmit}>
          <Text className="text-white text-center text-2xl">Conferma PIN</Text>
          <ArrowRight className="ml-2 text-white" />
        </Button.Primary>
      </View>
    </Modal>
  );
};

export default PinForm;
