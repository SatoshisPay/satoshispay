import React from 'react';
import { BackHandler, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Page, { RootStackParamList } from './pages';
import Activity from '../components/reusable/Activity';
import {
  createLnNodeMnemonic,
  setLnNodeMnemonic,
  setPin,
} from '../database/keystore';
import { breezConnect } from '../api/breez';
import ErrorModal from '../components/shared/ErrorModal';
import Menu from '../components/Onboarding/Menu';
import WalletCreated from '../components/Onboarding/WalletCreated';
import ConfirmBackup from '../components/Onboarding/ConfirmBackup';
import PinForm from '../components/Onboarding/PinForm';
import OnboardingCompleted from '../components/Onboarding/OnboardingCompleted';
import ImportWallet from '../components/Onboarding/ImportWallet';
import { useBackHandler } from '@react-native-community/hooks';

type Props = NativeStackScreenProps<RootStackParamList, Page.ONBOARDING>;

enum State {
  MENU,
  WALLET_CREATED,
  CONFIRM_BACKUP,
  IMPORT_WALLET,
  PIN_FORM,
  COMPLETED,
}

const Onboarding = ({ navigation }: Props) => {
  const [processing, setProcessing] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const [viewState, setViewState] = React.useState<State>(State.MENU);
  const [mnemonic, setMnemonic] = React.useState<string[]>();

  const onCompleted = () => {
    setProcessing(true);
    setViewState(State.COMPLETED);
    // connect to breez and go to home
    breezConnect()
      .then(() => {
        setProcessing(false);
        navigation.reset({
          index: 0,
          routes: [{ name: Page.HOME }],
        });
      })
      .catch(e => {
        setError(`Errore durante la connessione a Breez: ${e.message}`);
        setProcessing(false);
      });
  };

  const onPinCreated = (pin: string) => {
    setProcessing(true);
    // save pin
    setPin(pin)
      .then(() => {
        onCompleted();
      })
      .catch(e => {
        setProcessing(false);
        setError(`Errore durante il salvataggio del PIN: ${e.message}`);
      });
  };

  const onCreateNewWallet = () => {
    setProcessing(true);
    createLnNodeMnemonic()
      .then(newMnemonic => {
        setMnemonic(newMnemonic.split(' '));
        setProcessing(false);
        setViewState(State.WALLET_CREATED);
      })
      .catch(e => {
        setError(
          `Errore durante la creazione del wallet: ${e.message}. Riprova più tardi.`,
        );
        setProcessing(false);
      });
  };

  const onConfirmBackupRead = () => {
    setViewState(State.CONFIRM_BACKUP);
  };

  const onConfirmBackupChallenge = () => {
    setViewState(State.PIN_FORM);
  };

  const onImportWallet = () => {
    setViewState(State.IMPORT_WALLET);
  };

  const onConfirmImportWallet = (input: string[]) => {
    setProcessing(true);
    setLnNodeMnemonic(input.join(' '))
      .then(() => {
        setProcessing(false);
        setMnemonic(input);
        setViewState(State.PIN_FORM);
      })
      .catch(e => {
        setProcessing(false);
        setError(`Errore durante il ripristino del wallet: ${e.message}`);
      });
  };

  // handle back button
  useBackHandler(() => {
    // cancel import wallet
    if (viewState === State.IMPORT_WALLET) {
      setViewState(State.MENU);
      return true;
    }
    // allow reading backup again if forgotten
    if (viewState === State.CONFIRM_BACKUP) {
      setViewState(State.WALLET_CREATED);
      return true;
    }

    return true;
  });

  return (
    <Activity.ListPage>
      <ScrollView>
        {error ? (
          <ErrorModal error={error} onClick={() => setError(undefined)} />
        ) : null}
        {viewState === State.MENU ? (
          <Menu
            onCreateNewWallet={onCreateNewWallet}
            onImportWallet={onImportWallet}
            processing={processing}
          />
        ) : null}
        {viewState === State.WALLET_CREATED && mnemonic ? (
          <WalletCreated
            mnemonic={mnemonic}
            onCompleted={onConfirmBackupRead}
          />
        ) : null}
        {viewState === State.CONFIRM_BACKUP && mnemonic ? (
          <ConfirmBackup
            mnemonic={mnemonic}
            onConfirm={onConfirmBackupChallenge}
          />
        ) : null}
        {viewState === State.IMPORT_WALLET ? (
          <ImportWallet
            processing={processing}
            onConfirm={onConfirmImportWallet}
          />
        ) : null}
        {viewState === State.PIN_FORM ? (
          <PinForm onPinConfirm={onPinCreated} processing={processing} />
        ) : null}
        {viewState === State.COMPLETED ? <OnboardingCompleted /> : null}
      </ScrollView>
    </Activity.ListPage>
  );
};

export default Onboarding;
