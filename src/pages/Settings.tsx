import React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import ErrorModal from '../components/shared/ErrorModal';
import Activity from '../components/reusable/Activity';
import Page, { RootStackParamList } from './pages';
import { BackHandler } from 'react-native';
import Menu from '../components/Settings/Menu';
import WalletBackup from '../components/Settings/WalletBackup';
import RestoreWallet from '../components/Settings/RestoreWallet';
import SuccessModal from '../components/shared/SuccessModal';

export enum SettingsPage {
  MENU,
  BACKUP_WALLET,
  RESTORE_WALLET,
}

type Props = NativeStackScreenProps<RootStackParamList, Page.WAIT_FOR_PAYMENT>;

const Settings = ({ navigation }: Props) => {
  const [page, setPage] = React.useState<SettingsPage>(SettingsPage.MENU);
  const [error, setError] = React.useState<string>();
  const [success, setSuccess] = React.useState<string>();

  const onErrorDismiss = () => {
    setError(undefined);
  };

  const onSuccessDismiss = () => {
    setSuccess(undefined);
  };

  // handle back button
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (page === SettingsPage.MENU) {
          navigation.goBack();
        } else {
          setPage(SettingsPage.MENU);
        }
        return true;
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );
      return () => subscription.remove();
    }, [page]),
  );

  return (
    <Activity.ListPage>
      {error && <ErrorModal error={error} onClick={onErrorDismiss} />}
      {success && <SuccessModal message={success} onClick={onSuccessDismiss} />}
      {page === SettingsPage.MENU ? <Menu onPageChange={setPage} /> : null}
      {page === SettingsPage.BACKUP_WALLET ? (
        <WalletBackup setError={setError} />
      ) : null}
      {page === SettingsPage.RESTORE_WALLET ? (
        <RestoreWallet setError={setError} setSuccess={setSuccess} />
      ) : null}
    </Activity.ListPage>
  );
};

export default Settings;
