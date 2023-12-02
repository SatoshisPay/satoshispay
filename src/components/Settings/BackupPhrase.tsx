import React from 'react';
import { Text, View } from 'react-native';
import Mnemonic from '../reusable/Mnemonic';
import PinForm from '../reusable/PinForm';
import { getLnNodeMnemonic } from '../../database/keystore';
import Spinner from '../reusable/Spinner';

const BackupPhrase = () => {
  const [revealSecret, setRevealSecret] = React.useState<boolean>(false);
  const [mnemonic, setMnemonic] = React.useState<string[]>();

  React.useEffect(() => {
    if (revealSecret) {
      getLnNodeMnemonic()
        .then(secretPhrase => {
          setMnemonic(secretPhrase.split(' '));
        })
        .catch(e => {
          console.error(e);
        });
    }
  }, [revealSecret]);

  if (!revealSecret) {
    return (
      <PinForm
        visibile={true}
        onClose={() => {}}
        onValidPin={() => setRevealSecret(true)}
      />
    );
  }

  if (!mnemonic) {
    return (
      <Spinner bgColor="bg-transparent">
        <Text className="text-center text-2xl text-brandAlt">
          Attendere prego...
        </Text>
      </Spinner>
    );
  }

  return (
    <View className="flex flex-col w-full">
      <Mnemonic mnemonic={mnemonic} />
    </View>
  );
};

export default BackupPhrase;
