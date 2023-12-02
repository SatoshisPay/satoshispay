/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Picker } from '@react-native-picker/picker';

import { Network } from '../WithdrawalForm';

interface Props {
  className?: string;
  network: Network;
  onChange: (network: Network) => void;
}

const NetworkPicker = ({ className, network, onChange }: Props) => {
  return (
    <Picker
      selectedValue={network}
      onValueChange={onChange}
      className={className}
      style={{
        width: '100%',
        height: 50,
        backgroundColor: 'rgb(249 250 251)',
        textAlign: 'center',
      }}>
      <Picker.Item key={Network.BTC} label="Bitcoin" value={Network.BTC} />
      <Picker.Item
        key={Network.LN}
        label="Lightning Network"
        value={Network.LN}
      />
    </Picker>
  );
};

export default NetworkPicker;
