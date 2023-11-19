import React from 'react';
import { Text, View } from 'react-native';
import Button from '../reusable/Button';
import { ArrowRight } from 'react-native-feather';
import Alerts from '../reusable/Alerts';
import MnemonicForm from '../reusable/MnemonicForm';

interface Props {
  mnemonic: string[];
  onConfirm: () => void;
}

const ConfirmBackup = ({ mnemonic, onConfirm }: Props) => {
  const [userMnemonic, setUserMnemonic] = React.useState<string[]>(mnemonic);
  const [error, setError] = React.useState<string | undefined>();

  React.useEffect(() => {
    if (mnemonic.length === 12) {
      const newMnemonic = [...mnemonic];
      newMnemonic[3] = '';
      newMnemonic[5] = '';
      newMnemonic[10] = '';
      setUserMnemonic(newMnemonic);
    }
  }, []);

  const onSubmit = () => {
    if (userMnemonic.length !== mnemonic.length) {
      setError('Tutte le parole devono essere inserite');
      return;
    }

    for (let i = 0; i < mnemonic.length; i++) {
      if (userMnemonic[i] !== mnemonic[i]) {
        setError('Le parole inserite non sono corrette');
        return;
      }
    }

    onConfirm();
  };

  const onMnemonicWordChanged = (number: number, word: string) => {
    const newMnemonic = [...userMnemonic];
    newMnemonic[number - 1] = word;
    setUserMnemonic(newMnemonic);
  };

  return (
    <View className="flex flex-col w-full px-8">
      <Text className="text-2xl font-bold text-center pb-4">
        Conferma la secret phrase
      </Text>
      <MnemonicForm
        readOnly={[1, 2, 3, 5, 7, 8, 9, 10, 12]}
        mnemonic={userMnemonic}
        onMnemonicWordChanged={onMnemonicWordChanged}
      />
      <View className="flex flex-col items-center justify-center w-full pb-8">
        {error && (
          <Alerts.Danger>
            <Text className="text-red-700">{error}</Text>
          </Alerts.Danger>
        )}
        <Button.Primary onPress={onSubmit}>
          <Text className="text-white text-center text-lg">Procedi</Text>
          <ArrowRight className="inline text-white ml-2" />
        </Button.Primary>
      </View>
    </View>
  );
};

export default ConfirmBackup;
