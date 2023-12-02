/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { RecommendedFees } from '@breeztech/react-native-breez-sdk';

import { breezGetRecommendedFees } from '../../api/breez';

interface Props {
  className?: string;
  fee?: number;
  onFeeChanged: (fee: number | undefined) => void;
  onError: (error: string) => void;
}

const FeePicker = ({ className, onFeeChanged, fee, onError }: Props) => {
  const [recommendedFees, setRecommendedFees] =
    React.useState<RecommendedFees>();

  React.useEffect(() => {
    if (recommendedFees === undefined) {
      breezGetRecommendedFees()
        .then(setRecommendedFees)
        .catch(e => {
          console.error(e);
          onError(`Errore nel caricamento delle fee: ${e.message}`);
        });
    }
  }, [recommendedFees]);

  return (
    <Picker
      selectedValue={fee}
      onValueChange={onFeeChanged}
      className={className}
      style={{
        width: '100%',
        height: 50,
        backgroundColor: 'rgb(249 250 251)',
        textAlign: 'center',
      }}>
      {fee === undefined && (
        <Picker.Item
          style={{ color: 'gray' }}
          key={'none'}
          label={'Seleziona la fee'}
          value={undefined}
        />
      )}
      {recommendedFees && (
        <Picker.Item
          key={'min'}
          label={`minima (${recommendedFees.minimumFee} sat/vB)`}
          value={recommendedFees.minimumFee}
        />
      )}
      {recommendedFees && (
        <Picker.Item
          key={'economica'}
          label={`economica (${recommendedFees.economyFee} sat/vB)`}
          value={recommendedFees.economyFee}
        />
      )}
      {recommendedFees && (
        <Picker.Item
          key={'hour'}
          label={`~1 ora (${recommendedFees.hourFee} sat/vB)`}
          value={recommendedFees.hourFee}
        />
      )}
      {recommendedFees && (
        <Picker.Item
          key={'halfhour'}
          label={`~30 minuti (${recommendedFees.halfHourFee} sat/vB)`}
          value={recommendedFees.halfHourFee}
        />
      )}
      {recommendedFees && (
        <Picker.Item
          key={'max'}
          label={`massima priorità (${recommendedFees.fastestFee} sat/vB)`}
          value={recommendedFees.fastestFee}
        />
      )}
    </Picker>
  );
};

export default FeePicker;
