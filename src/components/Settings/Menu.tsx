import React from 'react';
import { ScrollView, Text } from 'react-native';

import { SettingsPage } from '../../pages/Settings';
import MenuButton from './Menu/MenuButton';
import {
  AlertTriangle,
  Edit,
  FileText,
  Info,
  MapPin,
  ShoppingCart,
} from 'react-native-feather';

interface Props {
  onPageChange: (page: SettingsPage) => void;
}

const Menu = ({ onPageChange }: Props) => (
  <ScrollView className="py-8 w-page mx-auto">
    <Text className="text-3xl">Il mio wallet</Text>
    <MenuButton
      onClick={() => onPageChange(SettingsPage.BUY_BITCOIN)}
      icon={<ShoppingCart className="text-brandAlt" />}
      text="Compra Bitcoin"
    />
    <Text className="text-3xl">Informazioni</Text>
    <MenuButton
      onClick={() => onPageChange(SettingsPage.APP_INFO)}
      icon={<Info className="text-brandAlt" />}
      text="Informazioni Sull'App"
    />
    <MenuButton
      onClick={() => onPageChange(SettingsPage.BTC_MAP)}
      icon={<MapPin className="text-brandAlt" />}
      text="Dove spendere i tuoi Bitcoin"
    />
    <Text className="text-3xl">Impostazioni</Text>
    <MenuButton
      onClick={() => onPageChange(SettingsPage.BACKUP_PHRASE)}
      icon={<Edit className="text-brandAlt" />}
      text="Backup Frase Segreta"
    />
    <MenuButton
      onClick={() => onPageChange(SettingsPage.LOG)}
      icon={<FileText className="text-brandAlt" />}
      text="Log applicazione"
    />
    <MenuButton
      icon={<AlertTriangle className="text-brandAlt" />}
      onClick={() => onPageChange(SettingsPage.RESTORE_APP)}
      text="Ripristino App"
    />
  </ScrollView>
);

export default Menu;
