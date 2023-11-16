import React from 'react';
import { ScrollView, Text } from 'react-native';

import { SettingsPage } from '../../pages/Settings';
import MenuButton from './Menu/MenuButton';
import { Download, Upload } from 'react-native-feather';

interface Props {
  onPageChange: (page: SettingsPage) => void;
}

const Menu = ({ onPageChange }: Props) => (
  <ScrollView className="py-8 w-page mx-auto">
    <Text className="text-3xl">Impostazioni</Text>
    <MenuButton
      onClick={() => onPageChange(SettingsPage.BACKUP_WALLET)}
      icon={<Download className="text-brandAlt" />}
      text="Backup Wallet"
    />
    <MenuButton
      icon={<Upload className="text-brandAlt" />}
      onClick={() => onPageChange(SettingsPage.RESTORE_WALLET)}
      text="Ripristina Wallet"
    />
  </ScrollView>
);

export default Menu;
