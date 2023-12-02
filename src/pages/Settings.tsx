import React from 'react';
import { useBackHandler } from '@react-native-community/hooks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import ErrorModal from '../components/shared/ErrorModal';
import Activity from '../components/reusable/Activity';
import Page, { RootStackParamList } from './pages';
import Menu from '../components/Settings/Menu';
import RestoreApp from '../components/Settings/RestoreApp';
import SuccessModal from '../components/shared/SuccessModal';
import AppInfo from '../components/Settings/AppInfo';
import BackupPhrase from '../components/Settings/BackupPhrase';

export enum SettingsPage {
  MENU,
  APP_INFO,
  BACKUP_PHRASE,
  RESTORE_APP,
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

  const onAppRestored = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: Page.STARTUP }],
    });
  };

  // handle back button

  useBackHandler(() => {
    if (page === SettingsPage.MENU) {
      navigation.goBack();
    } else {
      setPage(SettingsPage.MENU);
    }
    return true;
  });

  return (
    <Activity.ListPage>
      {error && <ErrorModal error={error} onClick={onErrorDismiss} />}
      {success && <SuccessModal message={success} onClick={onSuccessDismiss} />}
      {page === SettingsPage.MENU ? <Menu onPageChange={setPage} /> : null}
      {page === SettingsPage.APP_INFO ? <AppInfo /> : null}
      {page === SettingsPage.BACKUP_PHRASE ? <BackupPhrase /> : null}
      {page === SettingsPage.RESTORE_APP ? (
        <RestoreApp onRestore={onAppRestored} setError={setError} />
      ) : null}
    </Activity.ListPage>
  );
};

export default Settings;
