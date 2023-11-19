import React from 'react';
import { Image, Text, View, Linking } from 'react-native';
import { Download, PlusCircle } from 'react-native-feather';
import Button from '../reusable/Button';
import Spinner from '../reusable/Spinner';

interface Props {
  processing: boolean;
  onCreateNewWallet: () => void;
  onImportWallet: () => void;
}

const Menu = ({ processing, onCreateNewWallet, onImportWallet }: Props) => {
  return (
    <View>
      <View className="py-4 flex flex-col items-center justify-center w-full">
        <Image
          className="w-[128px] h-[128px] rounded-full mr-4"
          source={require('../../../assets/logo.png')}
        />
        <Text className="text-2xl font-bold mt-4">
          Benvenuto su SatoshisPay!
        </Text>
        <Text className="text-lg text-center bg-white m-4 p-4 rounded-xl font-bold">
          Per cominciare clicca su &quot;Crea nuovo wallet&quot; per creare un
          nuovo wallet oppure su &quot;Importa un wallet esistente&quot; per
          ripristinare un wallet esistente da una recovery phrase.
        </Text>
        <Text
          className="text-brand text-center underline text-xl"
          onPress={() =>
            Linking.openURL('https://satoshispay.app/get-started')
          }>
          Scopri di più su Satoshispay.app
        </Text>
      </View>
      {processing ? (
        <Spinner size={64} bgColor="bg-transparent">
          <Text className="text-brand text-xl text-center">
            Creazione del wallet in corso...{'\n'}Attendere, prego...
          </Text>
        </Spinner>
      ) : (
        <View className="flex flex-col items-center justify-center mx-auto">
          <Button.Primary onPress={onCreateNewWallet} disabled={processing}>
            <Text className="text-white text-xl">Crea nuovo wallet</Text>
            <PlusCircle className="inline text-white ml-2" />
          </Button.Primary>
          <Button.Secondary onPress={onImportWallet} disabled={processing}>
            <Text className="text-brandAlt text-xl">
              Importa un wallet esistente
            </Text>
            <Download className="inline text-brandAlt ml-2" />
          </Button.Secondary>
        </View>
      )}
    </View>
  );
};

export default Menu;
